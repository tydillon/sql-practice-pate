const { createConnection } = require('promise-mysql')
const { keys, map } = require('ramda')

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
  const body = req.body
  const requiredFields = ['first_name', 'last_name']
  const allowedFields = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'birthday'
  ]
  let errorKeys = []
  const bodyKeys = keys(body)
  map(x => {
    if (!bodyKeys.includes(x)) {
      errorKeys.push(x)
    }
  }, requiredFields)
  if (errorKeys.length > 0) {
    return res.send({
      error: `Missing required fields (${errorKeys.toString()})`
    })
  } else {
    res.send({ bodyKeys, errorKeys })
  }
}

module.exports = {
  listUsers,
  getUser,
  createUser
}
