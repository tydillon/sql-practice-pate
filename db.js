const { createConnection } = require('promise-mysql')

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

module.exports = {
  listUsers,
  getUser
}
