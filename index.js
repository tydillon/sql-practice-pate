const express = require('express')
const { listUsers, getUser } = require('./db')
const app = express()
const PORT = 3002

app.get('/users', function(req, res) {
  listUsers(req, res)
})

app.get('/users/:id', function(req, res) {
  getUser(req, res)
})

app.listen(PORT, null, () => console.log('Live on port: 3002'))
