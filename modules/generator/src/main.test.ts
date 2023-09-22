import func from './main'
import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const defaultPlayers = [
  { name: 'LettuceDog', elo: 'diamond', roles: [] },
  { name: 'CrissCross', elo: 'platinum', roles: ['bot', 'top'] },
  { name: 'Game0ver', elo: 'silver', roles: ['jug', 'sup'] },
  { name: 'dude go long', elo: 'platinum', roles: ['jug', 'mid'] },
  { name: 'barracuda', elo: 'gold', roles: ['bot', 'jug'] },
  { name: 'Hypr', elo: 'master', roles: ['mid'] },
  { name: 'you sweat in casual', elo: 'platinum', roles: ['top', 'jug'] },
  { name: 'I AM REX RYAN', elo: 'silver', roles: ['top', 'sup'] },
  { name: 'Bob Ross Ate My Son', elo: 'gold', roles: ['sup'] },
  { name: 'AOL Account', elo: 'gold', roles: [] },
]

describe('test suite', () => {
  it('[5v5 rift] default players', () => {
    const result = func(defaultPlayers)
  })

  it('[5v5 rift] divisions', () => {
    const players = [...defaultPlayers]
    players[0].elo = 'diamond4'
    players[1].elo = 'platinum2'
    const result = func(players)
  })

  it('[5v5 rift] full fill', () => {
    const players = [...new Array(10)].map((i) => ({
      name: `player${i}`,
      roles: [],
      elo: 'gold',
    }))
    const result = func(players)
  })

  it('[5v5 rift] full duplicate', () => {
    const players = [...new Array(10)].map((i) => ({
      name: `player${i}`,
      roles: ['mid', 'jug'],
      elo: 'gold',
    }))
    const result = func(players)
  })

  it('[5v5 rift] pro', () => {
    const players = [
      {
        name: 'faker',
        elo: 'challenger',
        roles: ['mid'],
      },
      {
        name: 'smeb',
        elo: 'challenger',
        roles: ['top'],
      },
      {
        name: 'kuro',
        elo: 'challenger',
        roles: ['mid'],
      },
      {
        name: 'peanut',
        elo: 'challenger',
        roles: ['jug'],
      },
      {
        name: 'prey',
        elo: 'challenger',
        roles: ['bot'],
      },
      {
        name: 'gorilla',
        elo: 'challenger',
        roles: ['sup'],
      },
      {
        name: 'bengi',
        elo: 'challenger',
        roles: ['jug'],
      },
      {
        name: 'wolf',
        elo: 'challenger',
        roles: ['sup'],
      },
      {
        name: 'bang',
        elo: 'challenger',
        roles: ['bot'],
      },
      {
        name: 'duke',
        elo: 'challenger',
        roles: ['top'],
      },
    ]
    const result = func(players)
  })

  it('throws error when missing data', () => {
    const players = [...defaultPlayers]
    players[0].name = ''
    try {
      const result = func(players)
      expect.fail()
    } catch (err) {
      if (err instanceof z.ZodError) {
        expect(err.issues[0].path).to.eql([0, 'name'])
      }
    }
  })
})
