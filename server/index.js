require('dotenv').config()
const express = require('express')
const massive = require('massive')
//const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const ctrl = require('./controller.js')



const app = express()
//Make sure that your middleware (app.use) is above the endpoints so they can run first
app.use(express.json())
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 10
//     }
//   }))



massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => console.log(`YEAH! Running on ${SERVER_PORT}`))
})