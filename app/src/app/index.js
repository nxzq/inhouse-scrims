import { useState } from 'react'

import Input from '../components/Input'
import Drafts from '../components/Drafts'
import Footer from '../components/Footer'

import layout from './layout.module.css'

export default function App() {
  const [errors, setErrors] = useState(null)
  const [appState, setAppState] = useState('input')
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem('players')) || [
      {
        name: 'LettuceDog',
        elo: 'diamond',
        roles: [],
      },
      {
        name: 'CrissCross',
        elo: 'platinum',
        roles: ['bot', 'top'],
      },
      {
        name: 'Game0ver',
        elo: 'silver',
        roles: ['jug', 'sup'],
      },
      {
        name: 'dude go long',
        elo: 'platinum',
        roles: ['jug', 'mid'],
      },
      {
        name: 'undefinedBarracuda',
        elo: 'gold',
        roles: ['bot', 'jug'],
      },
      {
        name: 'Hypr',
        elo: 'master',
        roles: ['mid'],
      },
      {
        name: 'you sweat in casual',
        elo: 'platinum',
        roles: ['top', 'jug'],
      },
      {
        name: 'I AM REX RYAN',
        elo: 'silver',
        roles: ['top', 'sup'],
      },
      {
        name: 'Bob Ross Ate My Son',
        elo: 'gold',
        roles: ['sup'],
      },
      {
        name: 'AOL Account',
        elo: 'gold',
        roles: [],
      },
    ]
  )

  const toggleState = () => {
    if (appState === 'input') setAppState('drafts')
    else setAppState('input')
  }

  const handleChange = (e, i) => {
    const summoners = players
    if (e.target.name === 'roles') {
      console.log('handler', e.target.value)
      summoners[i][e.target.name] = e.target.value
    } else summoners[i][e.target.name] = e.target.value
    setPlayers([...summoners])
  }

  const handleClear = (e) => {
    e.preventDefault()
    setPlayers(
      Array.from({ length: 10 }, () => ({ name: '', elo: 'gold', roles: [] }))
    )
    setErrors(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    toggleState()
  }

  return (
    <div className={layout.view}>
      <div className={layout.viewContent}>
        {appState === 'input' ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="lg:grid lg:grid-cols-2">
                {players.map((player, i) => (
                  <Input
                    summoner={player}
                    i={i}
                    handleChange={handleChange}
                    key={i}
                  />
                ))}
              </div>
              {errors && <pre>{errors}</pre>}
              <div style={{ padding: '1em', margin: '1em' }}>
                <input type="submit" value="Submit" className="btn" />
                <button onClick={(e) => handleClear(e)} className="btn">
                  Clear
                </button>
              </div>
            </form>
          </>
        ) : (
          <Drafts
            players={players}
            toggleState={toggleState}
            setErrors={setErrors}
          />
        )}
      </div>
      <div className={layout.viewFooter}>
        <Footer />
      </div>
    </div>
  )
}
