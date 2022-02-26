const inputSchema = require('./utils/validate')
const matchmaking = require('./matchmaking')

module.exports = function (input: Array<object>): Array<object> {
  inputSchema.validateSync(input)
  return matchmaking(input).slice(0, 100)
}
