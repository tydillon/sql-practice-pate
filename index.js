const express = require('express')
const bodyParser = require('body-parser')
const { listUsers, getUser, createUser, updateUser } = require('./db')
const app = express()
const PORT = 3002

app.use(bodyParser())

app.get('/users', function(req, res) {
  listUsers(req, res)
})

app.get('/users/:id', function(req, res) {
  getUser(req, res)
})

app.post('/users', function(req, res) {
  createUser(req, res)
})

app.put('/users/:id', function(req, res) {
  updateUser(req, res)
})

app.listen(PORT, null, () => console.log('Live on port: 3002'))
