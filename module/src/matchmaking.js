const { 
  MMR, 
  MMR_MODIFIER, 
  ROLES_BY_INDEX 
} = require('./utils/enums')
const draft = require('./draft')
const analyze = require('./analyze')

const getAverageDelta = (mmrBreakdown) => {
  let deltas = []
  for (let i = 0; i < 5; i++) {
    deltas.push(Math.abs(mmrBreakdown[i] - mmrBreakdown[i+5]))
  }
  return deltas.reduce((a, b) => a + b) / 10;
}

const getMedianDelta = (mmrBreakdown) => {
  let deltas = []
  for (let i = 0; i < 5; i++) {
    deltas.push(Math.abs(mmrBreakdown[i] - mmrBreakdown[i+5]))
  }
  return deltas.sort()[3];
}

const getRoleStatusArray = (players) => {
  return players.map((player, i) => {
    let role = ROLES_BY_INDEX[i]
    let status = 'autofill'
    if (player.roles.length === 0)
      status = 'fill'
    if (player.roles[0] === role)
      status = 'primary'
    if (player.roles[1] && player.roles[1] === role)
      status = 'secondary'
    return status
  })
}

const getDraftMetadata = (draft, players) => {
  const lobby = draft.map(x => players[x])
  const rolesBreakdown = getRoleStatusArray(lobby)
  const mmrBreakdown = lobby.map((x,i) => MMR[x.elo]*MMR_MODIFIER[rolesBreakdown[i]])
  const team1Players = lobby.slice(0, 5)
  const team2Players = lobby.slice(5)
  const team1Mmr = team1Players.reduce((x, y, i) => x + mmrBreakdown[i], 0)
  const team2Mmr = team2Players.reduce((x, y, i) => x + mmrBreakdown[i+5], 0)
  const avgDelta = getAverageDelta(mmrBreakdown)
  const medianDelta = getMedianDelta(mmrBreakdown)
  const roleScore = rolesBreakdown.map(x => {
    if (x === 'primary')
      return 2
    if (x === 'secondary')
      return 1
    else
      return 0
  }).reduce((a, b) => a + b, 0)
  return {
    draft,
    team1Mmr,
    team2Mmr,
    roleScore,
    delta: Math.abs(team1Mmr - team2Mmr),
    avgLaneDiff: Math.max(avgDelta, medianDelta),
    skillLevel: team1Mmr + team2Mmr
  }
}

const prettyOutput = (game, players) =>{
  const roster = game.draft.map(x => players[x])
  const rolesBreakdown = getRoleStatusArray(roster)
  const mmrBreakdown = roster.map((x,i) => MMR[x.elo]*MMR_MODIFIER[rolesBreakdown[i]])
  const { team1Mmr, team2Mmr, draft, ...metadata } = game
  const team1 = {
    roster: {
      top: { ...roster[0], autofill: rolesBreakdown[0] === 'autofill' ? true : false, mmr: mmrBreakdown[0] },
      jug: { ...roster[1], autofill: rolesBreakdown[1] === 'autofill' ? true : false, mmr: mmrBreakdown[1] },
      mid: { ...roster[2], autofill: rolesBreakdown[2] === 'autofill' ? true : false, mmr: mmrBreakdown[2] },
      bot: { ...roster[3], autofill: rolesBreakdown[3] === 'autofill' ? true : false, mmr: mmrBreakdown[3] },
      sup: { ...roster[4], autofill: rolesBreakdown[4] === 'autofill' ? true : false, mmr: mmrBreakdown[4] },
    },
    mmr: team1Mmr
  }
  const team2 = {
    roster: {
      top: { ...roster[5], autofill: rolesBreakdown[5] === 'autofill' ? true : false, mmr: mmrBreakdown[5] },
      jug: { ...roster[6], autofill: rolesBreakdown[6] === 'autofill' ? true : false, mmr: mmrBreakdown[6] },
      mid: { ...roster[7], autofill: rolesBreakdown[7] === 'autofill' ? true : false, mmr: mmrBreakdown[7] },
      bot: { ...roster[8], autofill: rolesBreakdown[8] === 'autofill' ? true : false, mmr: mmrBreakdown[8] },
      sup: { ...roster[9], autofill: rolesBreakdown[9] === 'autofill' ? true : false, mmr: mmrBreakdown[9] },
    },
    mmr: team2Mmr
  }
  const red = team1.mmr > team2.mmr ? team1 : team2
  const blue = team1.mmr > team2.mmr ? team2 : team1
  return {
    red,
    blue,
    metadata
  }
}

/**
 * matchmaking function
 * @param {Array.<Object>} data 
 * @returns {<Object>}
 */
module.exports = function(data) {
  const players = data.map(x => { return {...x, mmr: MMR[x.elo] }})
  const roleDiversity = [... new Set(players.map(x => JSON.stringify(x.roles)))]
  const autofill = roleDiversity.length <= 1 ? true : false
  const drafts = draft(players, autofill)
  const games = drafts.map(x => getDraftMetadata(x, players))
  const options = analyze(games)
  let game = options[Math.floor(Math.random() * options.length)]
  return prettyOutput(game, players)
}