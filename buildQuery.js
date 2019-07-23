const { keys, values, map } = require('ramda')

const columns = data => {
  return `(${keys(data).toString()})`
}

const getValues = data => {
  return `(${values(data).toString()})`
    .replace('(', "('")
    .replace(/\,/g, "','")
    .replace(')', "')")
}

const updateValues = data => {
  return map(key => {
    return `${key} = '${data[key]}'`
  }, keys(data)).toString()
}

module.exports = {
  insert: (table, data) => {
    // const exampleQuery = "INSERT INTO table SET (first_name, last_name) VALUES ('pate', 'bryant')"
    let query =
      `INSERT INTO ` + table + ` ${columns(data)} VALUES ${getValues(data)}`
    return query
  },
  update: (table, data, id) => {
    let query = `UPDATE ${table} SET ${updateValues(data)} WHERE id = ${id}`
    return query
  }
}
