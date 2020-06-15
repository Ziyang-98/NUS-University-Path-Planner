const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const router = express.Router()

const connectionString = 'mongodb+srv://pythonSnakes:753951@cluster0-gwy8r.gcp.mongodb.net/mod-planner?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('mod-planner-users')
        const users = db.collection('users')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use('/', router)
        app.use(express.static(__dirname + '/public'))
        app.set('view engine', 'ejs')

        app.get('/', (req, res) => {
            res.render('name.ejs', {})
        })

        app.get('/users/:name', (req, res) => {
            const date = new Date()
            const month = date.getMonth()

            const AY = req.body.AY ? req.body.AY : '19/20'
            const semester = req.body.semester ? req.body.semester : (month > 4 ? '2' : '1')
            db.collection('users').findOne({ name: req.params.name })
                .then(results => {
                    res.render('index.ejs', {
                        name: req.params.name,
                        modules: results.moduleList,
                        AY: AY,
                        semester: semester
                    })
                })
        })

        app.post('/name', (req, res) => {
            db.collection('users').find({ name: req.body.name }).count().then(count => {
                if (count === 0) {
                    users.insertOne({
                        name: req.body.name,
                        moduleList: {'19/202' : []}
                    })
                }
            }).then(res.redirect(`/users/${req.body.name}`))
        })

        app.post('/users/:name', (req, res) => {
            db.collection('users').findOne({ name: req.body.name })
                .then(results => {
                    const date = new Date()
                    const month = date.getMonth()

                    const AY = req.body.AY ? req.body.AY : '19/20'
                    const semester = req.body.semester ? req.body.semester : (month > 4 ? '2' : '1')
                    const id = AY + semester
                    
                    if (req.body.module) {
                        const newModList = results.moduleList
                        if (id in newModList) {
                            newModList[id].push(req.body.module)
                        } else {
                            newModList[id] = []
                            newModList[id].push(req.body.module)
                        }
                        db.collection('users').updateOne({name : req.body.name}, {$set:{moduleList : newModList}})
                    }
                    
                    res.render('index.ejs', {
                        name: req.body.name,
                        modules: results.moduleList,
                        AY: AY,
                        semester: semester
                    })
                })
                .catch(err => console.error(err))

        })

        app.post('/delete', (req, res) => {
            db.collection('users').findOne({ name: req.body.name })
                .then(results => {
                    const date = new Date()
                    const month = date.getMonth()

                    const AY = req.body.AY ? req.body.AY : '19/20'
                    const semester = req.body.semester ? req.body.semester : (month > 4 ? '2' : '1')
                    const id = AY + semester

                    const newModList = results.moduleList
                    
                    if (newModList) {
                        const modules = newModList[id]
                        if (modules) {
                            results.moduleList[id] = modules.filter((value, index, arr) => {
                                return value != req.body.module
                            })
                        }
                        db.collection('users').updateOne({name : req.body.name}, {$set:{moduleList : newModList}})
                    }
                    
                    res.render('index.ejs', {
                        name: req.body.name,
                        modules: results.moduleList,
                        AY: AY,
                        semester: semester
                    })
                })
                .catch(err => console.error(err))

        })

        app.listen(4000, () => {
            console.log("Listening on port 4000...")
        })

        // app.delete('/modules', (req, res) => {
        //     modsCollection.deleteOne(
        //         { name: req.body.name }
        //     )
        //         .then(result => {
        //             if (result.deletedCount === 0) {
        //                 return res.json("No more web lectures!")
        //             }
        //             res.json("Back to school!")
        //         })
        //         .catch(err => console.error(err))
        // })

    })






    //     app.post('/modules', (req, res) => {
    //         modsCollection.insertOne(req.body)
    //             .then(result => {
    //                 res.redirect('/')
    //             })
    //             .catch(err => console.error(err))
    //     })

    //     app.put('/modules', (req, res) => {
    //         modsCollection.findOneAndUpdate(
    //             { name: 'Seth Gilbert' },
    //             {
    //                 $set: {
    //                     name: req.body.name,
    //                     module: req.body.module
    //                 }
    //             },
    //             {
    //                 upsert: true
    //             }
    //         )
    //             .then(result => res.json('Success'))
    //             .catch(err => console.error(err))
    //     })




    // })
    // .catch(console.error)

