const func = require('../src')

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
  it('default players', () => {
    console.time('default players')
    const result = func(defaultPlayers)
    console.timeEnd('default players')
    console.log('# of results: ', result.length)
  })

  it('divisions', () => {
    const players = [...defaultPlayers]
    players[0].elo = 'diamond4'
    players[1].elo = 'platinum2'
    console.time('divisions')
    const result = func(players)
    console.timeEnd('divisions')
    console.log('# of results: ', result.length)
  })

  it('full fill', () => {
    const players = [...new Array(10)].map((i) => ({
      name: `player${i}`,
      roles: [],
      elo: 'gold',
    }))
    console.time('full fill')
    const result = func(players)
    console.timeEnd('full fill')
    console.log('# of results: ', result.length)
  })

  it('full duplicate', () => {
    const players = [...new Array(10)].map((i) => ({
      name: `player${i}`,
      roles: ['mid', 'jug'],
      elo: 'gold',
    }))
    console.time('full duplicate')
    const result = func(players)
    console.timeEnd('full duplicate')
    console.log('# of results: ', result.length)
  })

  it('pro', () => {
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
    console.time('pro')
    const result = func(players)
    console.timeEnd('pro')
    console.log('# of results: ', result.length)
  })
})
