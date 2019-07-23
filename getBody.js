const { keys, join, map } = require('ramda')

module.exports = (body, allowedFields, requiredFields = allowedFields) => {
  map(x => {
    if (!allowedFields.includes(x)) {
      delete body[x]
    }
  }, keys(body))

  const errorArr = requiredFields.filter(x => !keys(body).includes(x))

  if (errorArr.length > 0) {
    throw new Error(`Missing Required Fields: ${join(', ', errorArr)}`)
  }

  return body
}
