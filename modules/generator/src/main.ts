/* eslint-disable @typescript-eslint/no-explicit-any */
import { inputSchema } from './utils/validate'
import { Players, Lobby, Lobbies } from './types'
import { MMR, ROLES_BY_INDEX } from './utils/enums'
import { quantile, permutation } from './utils/compute'

const getTeamMMR = (team: Array<number>, players: Players): number => {
  let x = 0
  team.map((i) => (x += MMR[players[i].elo]))
  return x
}

function getUniqueTeams(set: Array<any>, k: number): Array<any> {
  let i, j, combs, head, tailcombs
  const temp = [...set]
  if (k == 1) {
    combs = []
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }
  combs = []
  while (temp.length > k + 1) {
    head = temp.slice(0, 1)
    tailcombs = getUniqueTeams(temp.slice(1), k - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
    temp.shift()
  }
  return combs
}

const getUniqueLobbies = (players: Players): Lobbies => {
  const lobbySize = players.length
  const teamSize = lobbySize / 2
  const fixedIndexArray = Array.from(Array(lobbySize).keys())
  const uniqueTeams = getUniqueTeams(fixedIndexArray, teamSize)

  return uniqueTeams.map((team) => {
    const lobbies = Array.from(new Set([...team, ...fixedIndexArray]))
    const team1 = lobbies.slice(0, teamSize)
    const team1mmr = getTeamMMR(team1, players)
    const team2 = lobbies.slice(teamSize, lobbySize)
    const team2mmr = getTeamMMR(team2, players)
    return {
      combo: lobbies,
      mmrDelta: Math.abs(team1mmr - team2mmr),
      team1: {
        players: team1,
        mmr: team1mmr,
      },
      team2: {
        players: team2,
        mmr: team2mmr,
      },
    }
  })
}

const getRoleStatusArray = (team: Array<number>, players: Players) => {
  return team.map((player, i) => {
    const role = ROLES_BY_INDEX[i]
    let status = 'autofill'
    if (players[player].roles.length === 0) status = 'fill'
    if (players[player].roles[0] === role) status = 'primary'
    if (players[player].roles[1] && players[player].roles[1] === role)
      status = 'secondary'
    return status
  })
}

const prettyRank = (elo: string) => {
  const ranks: { [key: number]: string } = {
    1: 'i',
    2: 'ii',
    3: 'iii',
    4: 'iv',
  }
  const division = !isNaN(Number(elo.slice(-1)))
  if (division) {
    return `${elo.charAt(0).toUpperCase() + elo.slice(1, -1)} ${ranks[
      Number(elo.slice(-1))
    ].toUpperCase()}`
  } else {
    return elo.charAt(0).toUpperCase() + elo.slice(1)
  }
}

const roleScoreLobbies = (lobby: Lobby, noRoles: boolean, players: Players) => {
  let team1Order = { order: lobby.team1.players, roleScore: 0 }
  let team2Order = { order: lobby.team1.players, roleScore: 0 }
  if (!noRoles) {
    team1Order = getTeamOrder(lobby.team1.players, players)
    team2Order = getTeamOrder(lobby.team2.players, players)
  }
  return {
    ...lobby,
    roleScore: team1Order.roleScore + team2Order.roleScore,
    team1: {
      ...lobby.team1,
      players: team1Order.order,
      roleScore: team1Order.roleScore,
    },
    team2: {
      ...lobby.team2,
      players: team2Order.order,
      roleScore: team2Order.roleScore,
    },
  }
}

const getLaneDelta = (
  team1: Array<number>,
  team2: Array<number>,
  players: Players
): number => {
  const deltas = []
  for (let i = 0; i < 5; i++) {
    deltas.push(
      Math.abs(MMR[players[team1[i]].elo] - MMR[players[team2[i]].elo])
    )
  }
  return deltas.reduce((a, b) => a + b)
}

const prettyOutput = (lobby: Lobby, players: Players) => {
  const team1RoleBreakdown = getRoleStatusArray(lobby.team1.players, players)
  const team2RoleBreakdown = getRoleStatusArray(lobby.team2.players, players)
  const teamA = {
    roster: {
      top: {
        ...players[lobby.team1.players[0]],
        autofill: team1RoleBreakdown[0] === 'autofill',
        mmr: MMR[players[lobby.team1.players[0]].elo],
        elo: prettyRank(players[lobby.team1.players[0]].elo),
      },
      jug: {
        ...players[lobby.team1.players[1]],
        autofill: team1RoleBreakdown[1] === 'autofill',
        mmr: MMR[players[lobby.team1.players[1]].elo],
        elo: prettyRank(players[lobby.team1.players[1]].elo),
      },
      mid: {
        ...players[lobby.team1.players[2]],
        autofill: team1RoleBreakdown[2] === 'autofill',
        mmr: MMR[players[lobby.team1.players[2]].elo],
        elo: prettyRank(players[lobby.team1.players[2]].elo),
      },
      bot: {
        ...players[lobby.team1.players[3]],
        autofill: team1RoleBreakdown[3] === 'autofill',
        mmr: MMR[players[lobby.team1.players[3]].elo],
        elo: prettyRank(players[lobby.team1.players[3]].elo),
      },
      sup: {
        ...players[lobby.team1.players[4]],
        autofill: team1RoleBreakdown[4] === 'autofill',
        mmr: MMR[players[lobby.team1.players[4]].elo],
        elo: prettyRank(players[lobby.team1.players[4]].elo),
      },
    },
    mmr: lobby.team1.mmr,
    roleScore: lobby.team2.roleScore,
  }
  const teamB = {
    roster: {
      top: {
        ...players[lobby.team2.players[0]],
        autofill: team2RoleBreakdown[0] === 'autofill',
        mmr: MMR[players[lobby.team2.players[0]].elo],
        elo: prettyRank(players[lobby.team2.players[0]].elo),
      },
      jug: {
        ...players[lobby.team2.players[1]],
        autofill: team2RoleBreakdown[1] === 'autofill',
        mmr: MMR[players[lobby.team2.players[1]].elo],
        elo: prettyRank(players[lobby.team2.players[1]].elo),
      },
      mid: {
        ...players[lobby.team2.players[2]],
        autofill: team2RoleBreakdown[2] === 'autofill',
        mmr: MMR[players[lobby.team2.players[2]].elo],
        elo: prettyRank(players[lobby.team2.players[2]].elo),
      },
      bot: {
        ...players[lobby.team2.players[3]],
        autofill: team2RoleBreakdown[3] === 'autofill',
        mmr: MMR[players[lobby.team2.players[3]].elo],
        elo: prettyRank(players[lobby.team2.players[3]].elo),
      },
      sup: {
        ...players[lobby.team2.players[4]],
        autofill: team2RoleBreakdown[4] === 'autofill',
        mmr: MMR[players[lobby.team2.players[4]].elo],
        elo: prettyRank(players[lobby.team2.players[4]].elo),
      },
    },
    mmr: lobby.team2.mmr,
    roleScore: lobby.team2.roleScore,
  }
  const red = teamA.mmr > teamB.mmr ? teamA : teamB
  const blue = teamA.mmr > teamB.mmr ? teamB : teamA
  return {
    red,
    blue,
    metadata: {
      roleScore: lobby.roleScore,
      delta: lobby.mmrDelta,
      laneDelta: getLaneDelta(
        lobby.team1.players,
        lobby.team2.players,
        players
      ),
      skillLevel: teamA.mmr + teamB.mmr,
    },
  }
}

const getTeamOrder = (
  team: Array<number>,
  players: Players
): { order: Array<number>; roleScore: number } => {
  const perm = permutation(team)
  const results = perm.map((x) => {
    const rolesBreakdown = getRoleStatusArray(x, players)
    const roleScore = rolesBreakdown
      .map((x) => {
        if (x === 'primary') return Number(2)
        if (x === 'secondary') return Number(1)
        else return Number(0)
      })
      .reduce((a, b) => a + b, 0)
    return {
      order: x,
      roleScore,
    }
  })
  const sorted = results.sort((a, b) => b.roleScore - a.roleScore)
  return sorted[0]
}

function matchmaking(players: Players) {
  const noRoles =
    !players.map((x) => x.roles).flat().length || players.length < 10
  const lobbies = getUniqueLobbies(players)
  const equilibriumValue = quantile(
    lobbies.map((x) => x.mmrDelta),
    0.5
  )
  const balancedLobbies = lobbies.filter((x) => x.mmrDelta <= equilibriumValue)
  const output = balancedLobbies
    .map((x) => roleScoreLobbies(x, noRoles, players))
    .map((x) => prettyOutput(x, players))
  return output
    .sort((a, b) => {
      if (Number(b.metadata.roleScore) - Number(a.metadata.roleScore) === 0)
        if (b.metadata.delta - a.metadata.delta === 0)
          if (b.metadata.laneDelta - a.metadata.laneDelta === 0)
            return (
              Math.abs(Number(a.red.roleScore) - Number(a.blue.roleScore)) -
              Math.abs(Number(b.red.roleScore) - Number(b.blue.roleScore))
            )
          else return a.metadata.laneDelta - b.metadata.laneDelta
        else return a.metadata.delta - b.metadata.delta
      return Number(b.metadata.roleScore) - Number(a.metadata.roleScore)
    })
    .slice(0, 100)
}

export default function (input: Players): Array<object> {
  inputSchema.parse(input)
  return matchmaking(input)
}
