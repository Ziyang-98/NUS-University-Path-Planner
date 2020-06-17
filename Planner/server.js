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
                                //fetch the data from the corresponding year
                                fetch(`https://api.nusmods.com/v2/${year}/moduleList.json`)
                                    .then(response => response.json())
                                    .then(data => {
                                        const moduleList = {}
                                        for (module of data) {
                                            const name = module.moduleCode
                                            moduleList[name] = module
                                        }
                                        modules[AY] = moduleList
                                        console.log(Object.keys(modules))
                                        db.collection('data').insertOne({ modules: modules })
                                    })
                            } else if (!results['modules'].hasOwnProperty(AY)) { //no module list for current year
                                const modules = results.modules
                                //fetch the data from the corresponding year
                                fetch(`https://api.nusmods.com/v2/${year}/moduleList.json`)
                                    .then(response => response.json())
                                    .then(data => {
                                        const moduleList = {}
                                        for (module of data) {
                                            const name = module.moduleCode
                                            moduleList[name] = module
                                        }
                                        modules[AY] = moduleList
                                        db.collection('data').updateOne({ modules: { $exists: true } }, { $set: { modules: modules } })
                                    })
                            }
                        })
                        .then(ignore => {  //no input from prev 
                            res.render('index.ejs', {
                                name: req.params.name,
                                modules: data.moduleList,
                                AY: AY,
                                semester: semester
                            })
                        })
                })
        })

        app.post('/name', (req, res) => {
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
                    }
                })
                .then(res.redirect(`/users/${req.body.name}`))
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

        app.listen(4000, () => {
            console.log("Listening on port 4000...")
        })
    })

