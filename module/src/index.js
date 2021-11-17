const inputSchema = require('./utils/validate')
const matchmaking = require('./matchmaking')

/**
 * inhouse generator coordinator
 * @param {Array.<Object>} input 
 * @param {boolean} [random] 
 * @returns {<Object>} 
 */
module.exports = function(input, random=false) {
  inputSchema.validateSync(input)
  return matchmaking(input, random)
}
