const { keys, values } = require('ramda')

const columns = data => {
  return `(${keys(data).toString()})`
}

const getValues = data => {
  return `(${values(data).toString()})`
    .replace('(', "('")
    .replace(/\,/g, "','")
    .replace(')', "')")
}

module.exports = {
  insert: (table, data) => {
    // const exampleQuery = "INSERT INTO table SET (first_name, last_name) VALUES ('pate', 'bryant')"
    let str =
      `INSERT INTO ` + table + ` ${columns(data)} VALUES ${getValues(data)}`
    return str
  }
}
