import { useState } from 'react'

import Input from '../components/Input'
import Drafts from '../components/Drafts'
import Footer from '../components/Footer'

import githubIcon from '../img/github.svg'
import layout from './layout.module.css'

const defaultPlayers = [
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
    name: 'barracuda',
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

const getPlayers = () => {
  const value = localStorage.getItem('players')
  if (value) {
    try {
      const players = JSON.parse(value)
      return players
    } catch (error) {
      localStorage.removeItem('players')
      return defaultPlayers
    }
  } else {
    return defaultPlayers
  }
}

export default function App() {
  const [errors, setErrors] = useState(null)
  const [appState, setAppState] = useState('input')
  const [players, setPlayers] = useState(getPlayers())

  const toggleState = () => {
    if (appState === 'input') setAppState('drafts')
    else setAppState('input')
  }

  const handleChange = (e, i) => {
    const summoners = [...players]
    if (e.target.name === 'roles') {
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
            <div className="flex flex-wrap w-full justify-center p-2">
              <p className="text-slate-300 text-center mx-2">
                open source league of legends inhouse scrims matchmaking
              </p>
              <a href="https://github.com/exclamationpointhuman/inhouse-scrims/tree/main/module">
                <p className="text-slate-400 hover:text-slate-500 hover:underline mx-2 flex items-center justify-center">
                  <img src={githubIcon} alt="" className="w-5 h-5" />
                  &nbsp;view algorithm here
                </p>
              </a>
            </div>
            {errors && (
              <div className="ml-2">
                <span className="text-rose-700 font-semibold uppercase">
                  Errors
                </span>
                <pre>{errors}</pre>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-center justify-items-center m-1">
                {players.map((player, i) => (
                  <Input
                    summoner={player}
                    i={i}
                    handleChange={handleChange}
                    key={i}
                  />
                ))}
              </div>
              {errors && (
                <div className="ml-2">
                  <span className="text-rose-700 font-semibold uppercase">
                    Errors
                  </span>
                  <pre>{errors}</pre>
                </div>
              )}
              <div className="flex p-2 m-2">
                <input
                  type="submit"
                  value="Generate Inhouse Lobbies"
                  className="btn w-60"
                />
                <button onClick={(e) => handleClear(e)} className="btn w-24">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
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
