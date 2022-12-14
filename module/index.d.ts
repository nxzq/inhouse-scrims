interface Player {
  name: string
  elo: string
  roles: string[]
}

interface Players extends Array<Player> {}

interface Lobby {
  combo: number[]
  mmrDelta: number
  roleScore?: number
  team1: { players: number[]; mmr: number; roleScore?: number }
  team2: { players: number[]; mmr: number; roleScore?: number }
}

interface Lobbies extends Array<Lobby> {}