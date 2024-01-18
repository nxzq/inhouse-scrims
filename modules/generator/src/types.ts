export type Player = {
  name: string
  elo: string
  roles: string[]
}

export type Players = Player[]

export type Lobby = {
  combo: number[]
  mmrDelta: number
  roleScore?: number
  team1: { players: number[]; mmr: number; roleScore?: number }
  team2: { players: number[]; mmr: number; roleScore?: number }
}

export type Lobbies = Lobby[]
