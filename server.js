const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()



const connectionString = process.env.DB_STRING

MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        const db = client.db('todo-list')
        const tasksCollection = db.collection('todos')

        app.set('view engine', 'ejs')
        app.use(express.urlencoded({extended: true}))
        app.use(express.static('public'))
        app.use(express.json())

        app.get('/',(request, response) => {
            db.collection('todos').find().toArray()
            .then(results => {
                response.render('index.ejs', {todos: results})
            })
            .catch(error => console.error(error))
            
        })

        
        app.post('/todo', (request, response) => {
            db.collection('todos').insertOne({todo: request.body.todo, completed: false})
         
            .then(result => {
                response.redirect('/')
            })
            .catch(error => console.error(error))
        })
        

        app.delete('/delTask', (request, response) => {
            db.collection('todos').deleteOne({todo: request.body.todoS})
            .then(result => {
                console.log('Task Deleted')
                response.json(`Task Deleted`)
                
            })
            .catch(error => console.error(error))
        })

        app.put('/completedTask', (request, response) => {
            db.collection('todos').updateOne({todo: request.body.itemFromJS},{
                $set: {
                    completed: true
                }
            },{
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('Marked Complete')
                response.json('Marked Complete')
            })
            .catch(error => console.error(error))
        })

        app.put('/undoTask', (request, response) => {
            db.collection('todos').updateOne({todo: request.body.itemFromJS},{
                $set: {
                    completed: false
                }

            },{
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('Marked Complete')
                response.json('Marked Complete')
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
 
    app.listen(process.env.PORT || PORT, () => {
        console.log('listening on 3000')
    })

