const inputSchema = require('./utils/validate')
const matchmaking = require('./matchmaking')

/**
 * inhouse generator coordinator
 * @param {Array.<Object>} input
 * @returns {Array.<Object>}
 */
module.exports = function (input) {
  inputSchema.validateSync(input)
  return matchmaking(input).slice(0, 100)
}
