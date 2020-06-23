const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const MongoClient = require('mongodb').MongoClient
const app = express()
const router = express.Router()

const connectionString = 'mongodb+srv://pythonSnakes:753951@cluster0-gwy8r.gcp.mongodb.net/mod-planner-users?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('mod-planner-users')
        const users = db.collection('users')
        const modules = db.collection('modules')

        //new
        const data = db.collection('data')

        let curr_user = ""

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use('/', router)
        app.use(express.static(__dirname + '/public'))
        app.set('view engine', 'ejs')

        app.get('/', (req, res) => {
            res.render('name.ejs', {})
        })

        app.get('/module/:acadYear/:moduleCode', (req, res) => {
            fetch(`https://api.nusmods.com/v2/${req.params.acadYear}/modules/${req.params.moduleCode}.json`)
                .then(response => response.json())
                .then(data => res.send(data.moduleCredit))
        })

        app.get('/users/:name', (req, res) => {
            const date = new Date()
            const month = date.getMonth()

            const AY = req.body.AY ? req.body.AY : '19/20'
            const semester = req.body.semester ? req.body.semester : (month > 4 ? '2' : '1')

            db.collection('data').findOne({ users: { $exists: true } })
                .then(results => {
                    //this block checks if user has a moduleList for current AY/sem
                    //and creates one if it does not
                    const user = results.users[req.params.name]
                    const moduleList = user.moduleList
                    const id = AY + semester
                    if (!moduleList.hasOwnProperty(id)) {
                        moduleList[id] = []
                        results.users[req.params.name] = user
                    }
                    db.collection('data').updateOne({ users: { $exists: true } }, { $set: { users: results.users } })
                    return {
                        moduleList: moduleList,
                        AY: AY,
                        semester: semester
                    }
                }) //we then pass the data to render all the modules in the user's moduleList
                .then(data => {
                    db.collection('data').findOne({ modules: { $exists: true } })
                        .then(results => {
                            const year = '20' + data.AY.slice(0, 2) + '-20' + data.AY.slice(3, 5)
                            if (!results) {   //if modules document not initialised yet                               
                                const modules = {}
                                fetch(`https://api.nusmods.com/v2/${year}/moduleInfo.json`)
                                    .then(response => response.json())
                                    .then(data => {
                                        //REPLACE THE INITIALISATION WITH THE FOLLOWING CODE:
                                        const moduleList = {
                                            1: {},
                                            2: {},
                                            3: {},
                                            4: {}
                                        }
                                        for (module of data) {
                                            const semesterData = module.semesterData
                                            const moduleData = {
                                                moduleCode: module.moduleCode,
                                                title: module.title,
                                                moduleCredit: module.moduleCredit
                                            }
                                            for (sem of semesterData) {
                                                moduleList[sem.semester][module.moduleCode] = moduleData
                                            }
                                        }
                                        //TILL HERE. REPEAT FOR THE ELSE IF STATEMENT BELOW
                                        modules[AY] = moduleList
                                        db.collection('data').insertOne({ modules: modules })
                                    })
                            } else if (!results['modules'].hasOwnProperty(data.AY)) { //no module list for current year
                                const modules = results.modules
                                //fetch the data from the corresponding year
                                fetch(`https://api.nusmods.com/v2/${year}/moduleInfo.json`)
                                    .then(response => response.json())
                                    .then(data => {
                                        const moduleList = {
                                            1: {},
                                            2: {},
                                            3: {},
                                            4: {}
                                        }
                                        for (module of data) {
                                            const semesterData = module.semesterData
                                            const moduleData = {
                                                moduleCode: module.moduleCode,
                                                title: module.title,
                                                moduleCredit: module.moduleCredit
                                            }
                                            for (sem of semesterData) {
                                                moduleList[sem.semester][module.moduleCode] = moduleData
                                            }
                                        }
                                        modules[AY] = moduleList
                                        db.collection('data').updateOne({ modules: { $exists: true } }, { $set: { modules: modules } })
                                    })
                            }
                        })
                    return {
                        moduleList: data.moduleList
                    }
                })
                .then(data => {
                    res.render('index.ejs', {
                        name: req.params.name,
                        modules: data.moduleList,
                        AY: AY,
                        semester: semester
                    })
                })
        })


        app.post('/name', (req, res) => {
            curr_user = req.body.name
            db.collection('data').findOne({ users: { $exists: true } })
                .then(results => {
                    //if database is not initialised yet
                    if (!results) {
                        const users = { users: {} }
                        const user = {
                            name: req.body.name,
                            moduleList: {}
                        }
                        users.users[req.body.name] = user
                        db.collection('data').insertOne(users)
                    } else if (!results['users'].hasOwnProperty(req.body.name)) { //the user does not exist in users
                        const user = {
                            name: req.body.name,
                            moduleList: {}
                        }
                        results['users'][req.body.name] = user
                        db.collection('data').updateOne({ users: { $exists: true } }, { $set: results })
                            .then(res.redirect(`/users/${req.body.name}`))
                    } else {
                        res.redirect(`/users/${req.body.name}`)
                    }
                })
                .catch(err => console.error(err))
        })

        app.post('/users/:name', (req, res) => {
            db.collection('data').findOne({ users: { $exists: true } })
                .then(results => {
                    //this block checks if user has a moduleList for current AY/sem
                    //and creates one if it does not
                    const user = results.users[req.params.name]
                    const moduleList = user.moduleList
                    const id = req.body.AY + req.body.semester
                    if (!moduleList.hasOwnProperty(id)) {
                        moduleList[id] = []
                        results.users[req.params.name] = user
                    }
                    db.collection('data').updateOne({ users: { $exists: true } }, { $set: { users: results.users } })
                    return {
                        data: results,
                        AY: req.body.AY,
                        semester: req.body.semester
                    }
                })
                .then(data => {
                    //then we find the module list for current AY sem
                    //check if module input
                    //if have then update that module list
                    //render accordingly
                    const date = new Date()
                    const month = date.getMonth()

                    const AY = data.AY ? data.AY : '19/20'
                    const semester = data.semester ? data.semester : (month > 4 ? '2' : '1')
                    const id = AY + semester

                    const user = data.data.users[req.params.name]
                    const moduleList = user.moduleList[id]

                    //if there is a module to be inserted
                    if (req.body.module) {
                        //if current year has not had this module yet
                        if (!moduleList.includes(req.body.module)) {
                            moduleList.push(req.body.module)
                            data.data.users[req.body.name] = user
                            db.collection('data').updateOne({ users: { $exists: true } }, { $set: { users: data.data.users } })
                        }
                    }
                    res.render('index.ejs', {
                        name: req.body.name,
                        modules: data.data.users[req.body.name].moduleList,
                        AY: AY,
                        semester: semester
                    })
                })
                .catch(err => console.error(err))
        })

        app.post('/delete', (req, res) => {
            db.collection('data').findOne({ users: { $exists: true } })
                .then(results => {
                    //this block checks if user has a moduleList for current AY/sem
                    //and does nothing if the current sem does not exist
                    const user = results.users[req.body.name]
                    const moduleList = user.moduleList
                    const id = req.body.AY + req.body.semester
                    if (moduleList.hasOwnProperty(id)) {
                        moduleList[id] = moduleList[id].filter((curr, index, arr) => {
                            return curr !== req.body.module
                        })
                        results.users[req.params.name] = user
                        db.collection('data').updateOne({ users: { $exists: true } }, { $set: { users: results.users } })
                    }

                    res.render('index.ejs', {
                        name: req.body.name,
                        modules: moduleList,
                        AY: req.body.AY,
                        semester: req.body.semester
                    })
                })
                .catch(err => console.error(err))
        })

        app.get('/reviews', (req, res) => {
            db.collection('data').findOne({ reviews: { $exists: true } })
                .then(results => {
                    res.render('reviews.ejs', {
                        reviews: results.reviews
                    })
                })
        })

        app.get('/reviews/:name', (req, res) => {
            db.collection('data').findOne({ reviews: { $exists: true } })
                .then(results => {
                    reviews = results.reviews
                    const review = reviews[req.params.name]
                    res.render('review-template.ejs', {
                        review: review
                    })
                })
        })

        app.post('/upvote', (req, res) => {
            db.collection('data').findOne({ reviews: { $exists: true } })
                .then(results => {
                    reviews = results.reviews
                    const review = reviews[req.body.name]

                    //logic of upvoting
                    const upvoted = JSON.parse(req.body.upvoted).filter(user => user === curr_user)
                    const downvoted = JSON.parse(req.body.downvoted).filter(user => user === curr_user)

                    //if user has previously downvoted
                    if (downvoted.length > 0) {
                        review.votes = review.votes + 1
                        review.downvoted = JSON.parse(req.body.downvoted).filter(user => user != curr_user)
                    } else if (upvoted.length == 0) {
                        review.votes = review.votes + 1
                        review.upvoted.push(curr_user)
                    }

                    reviews[req.body.name] = review
                    results.reviews = reviews
                    db.collection('data').updateOne({ reviews: { $exists: true } }, { $set: { reviews: results.reviews } })
                })
                .then(ignore => {
                    res.redirect(`/reviews/${req.body.name}`)
                })
        })

        app.post('/downvote', (req, res) => {
            db.collection('data').findOne({ reviews: { $exists: true } })
                .then(results => {
                    reviews = results.reviews
                    const review = reviews[req.body.name]

                    //logic of downvoting
                    const upvoted = JSON.parse(req.body.upvoted).filter(user => user === curr_user)
                    const downvoted = JSON.parse(req.body.downvoted).filter(user => user === curr_user)

                    if (upvoted.length > 0) {
                        review.votes = review.votes - 1
                        review.upvoted = JSON.parse(req.body.upvoted).filter(user => user != curr_user)
                    } else if (downvoted.length == 0) {
                        review.votes = review.votes - 1
                        review.downvoted.push(curr_user)

                    }
                    reviews[req.body.name] = review
                    results.reviews = reviews
                    db.collection('data').updateOne({ reviews: { $exists: true } }, { $set: { reviews: results.reviews } })
                })
                .then(ignore => {
                    res.redirect(`/reviews/${req.body.name}`)
                })
        })

        app.post('/reviews/:name', (req, res) => {
            const review = {
                name: req.body.name,
                moduleList: JSON.parse(req.body.moduleList),
                title: req.body.title,
                desc: req.body.desc,
                votes: req.body.votes,
                upvoted: JSON.parse(req.body.upvoted),
                downvoted: JSON.parse(req.body.downvoted)
            }
            res.render('review-template.ejs', {
                review: review
            })
        })

        app.post('/submit-review', (req, res) => {
            res.render('submit-review.ejs', {
                name: req.body.name,
                moduleList: JSON.parse(req.body.moduleList)
            })
        })

        app.post('/reviews', (req, res) => {
            db.collection('data').findOne({ reviews: { $exists: true } })
                .then(results => {
                    reviews = results.reviews
                    const review = {
                        name: req.body.name,
                        moduleList: JSON.parse(req.body.moduleList),
                        title: req.body.title,
                        desc: req.body.desc,
                        votes: 0,
                        upvoted: [],
                        downvoted: []
                    }
                    reviews[req.body.name] = review
                    results.reviews = reviews
                    db.collection('data').updateOne({ reviews: { $exists: true } }, { $set: { reviews: results.reviews } })
                })
                .then(ignore => {
                    res.redirect('/reviews')
                })
        })

        app.listen(4000, () => {
            console.log("Listening on port 4000...")
        })
    })

