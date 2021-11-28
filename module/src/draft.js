const { ROLES_BY_INDEX } = require('./utils/enums')

const permutation = (array) => {
  function p(array, temp) {
      var i, x
      if (!array.length) {
        result.push(temp)
      }
      if (array.length === 10) {
        for (i = 0; i < 5; i++) {
          x = array.splice(i, 1)[0]
          p(array, temp.concat(x))
          array.splice(i, 0, x)
        }
      } else {
        for (i = 0; i < array.length; i++) {
          x = array.splice(i, 1)[0]
          p(array, temp.concat(x))
          array.splice(i, 0, x)
        }
      }
  }

  var result = []
  p(array, [])
  return result
}

const autofillProtection = (lobbies, players) => {
  const autofillCount = lobbies.map(x => x.filter((y,i) => !(players[y].roles.length === 0 || players[y].roles.includes(ROLES_BY_INDEX[i]))).length)
  const autofillCountSet = [...new Set(autofillCount)].sort((a,b) => a-b)
  const autofillCountThreshold = autofillCountSet[0] 
  return lobbies.filter((x,i) => autofillCount[i] <= autofillCountThreshold)
}

/**
 * creates all combination of players/roles/teams, removes autofilled lobbies if possible
 * @param {Array.<Object>} players 
 * @param {Boolean} autofill 
 * @returns {Array.<number>}
 */
module.exports = function(players, autofill) {
  const fixedIndexArray = [0,1,2,3,4,5,6,7,8,9]
  const lobbies = permutation(fixedIndexArray)
  if (autofill)
    return lobbies
  else
    return autofillProtection(lobbies, players)
}