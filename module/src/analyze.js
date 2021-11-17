const quantile = (arr, q) => {
  const sorted = arr.sort((a, b) => a - b)
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  } else {
      return sorted[base]
  }
}

const filterDelta = (lobbies, deltaValuesThreshold) => {
  return lobbies.filter(x => x.delta <= deltaValuesThreshold)
}

const filterAvgLaneDiff = (lobbies, avgLaneDiffThreshold) => {
  return lobbies.filter(x => x.avgLaneDiff <= avgLaneDiffThreshold)
}

const filterRoleScore = (lobbies, roleScoreThreshold) => {
  return lobbies.filter(x => x.roleScore >= roleScoreThreshold)
}

const filterSkillLevel = (lobbies, skillLevelThreshold) => {
  return lobbies.filter(x => x.skillLevel >= skillLevelThreshold)
}

/**
 * reduces games array to only games satisfying top 25 percentile in various stats
 * @param {Array.<Object>} games 
 * @returns {Array.<Object>}
 */
module.exports = function(games) {
  let options = games
  const avgLaneDiffThreshold = quantile(options.map(x => x.avgLaneDiff),.25)
  options = filterAvgLaneDiff(options, avgLaneDiffThreshold)
  const roleScoreThreshold = quantile(options.map(x => x.roleScore),.75)
  options = filterRoleScore(options, roleScoreThreshold)
  const deltaValuesThreshold = quantile(options.map(x => x.delta),.25)
  options = filterDelta(options, deltaValuesThreshold)
  const skillLevelThreshold = quantile(options.map(x => x.skillLevel),.75)
  options = filterSkillLevel(options, skillLevelThreshold)
  return options.sort((a,b) => {
    if (a.delta - b.delta === 0)
      return b.skillLevel - a.skillLevel
    return a.delta - b.delta
  })
}