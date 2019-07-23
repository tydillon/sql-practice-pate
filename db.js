const { createConnection } = require('promise-mysql')
const { keys, map } = require('ramda')
const buildQuery = require('./buildQuery')
const getBody = require('./getBody')

const listUsers = (req, res) => {
  let db
  createConnection({ user: 'root', password: 'Lexi0722', database: 'test' })
    .then(conn => {
      db = conn
      return db.query('SELECT * FROM users')
    })
    .then(result => {
      db.end()
      res.send(result)
    })
    .catch(err => {
      db.end()
      console.log(err)
    })
}

const getUser = (req, res) => {
  const userId = req.params.id
  let db
  createConnection({ user: 'root', password: 'Lexi0722', database: 'test' })
    .then(conn => {
      db = conn
      return db.query('SELECT * FROM users WHERE id = ?', [userId])
    })
    .then(result => {
      db.end()
      res.send(result)
    })
    .catch(err => {
      db.end()
      console.log(err)
    })
}

const createUser = (req, res) => {
  let body = req.body
  const requiredFields = ['first_name', 'last_name']
  const allowedFields = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'birthday'
  ]
  try {
    body = getBody(body, allowedFields, requiredFields)
  } catch (err) {
    return res.send({ message: err.message })
  }
  //   let errorKeys = []
  //   const bodyKeys = keys(body)
  //   map(x => {
  //     if (!bodyKeys.includes(x)) {
  //       errorKeys.push(x)
  //     }
  //   }, requiredFields)
  //   if (errorKeys.length > 0) {
  //     return res.send({
  //       error: `Missing required fields (${errorKeys.toString()})`
  //     })
  //   } else {
  //     const newBody = body
  //     body = {}
  //     map(x => {
  //       if (newBody.hasOwnProperty(x)) {
  //         body[x] = newBody[x]
  //       }
  //     }, allowedFields)
  //   }
  //   //   res.send(body)
  createConnection({ user: 'root', password: 'Lexi0722', database: 'test' })
    .then(conn => {
      db = conn
      return db.query(buildQuery.insert('users', body))
    })
    .then(result => {
      db.end()
      if (result.affectedRows >= 1) {
        res.send({ message: `User created with id: ${result.insertId}` })
      }
    })
    .catch(err => {
      db.end()
      console.log(err)
    })
}

module.exports = {
  listUsers,
  getUser,
  createUser
}
