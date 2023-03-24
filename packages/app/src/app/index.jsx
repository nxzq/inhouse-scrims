import { useState } from 'react'

import Input from '../components/Input'
import Drafts from '../components/Drafts'
import Footer from '../components/Footer'

import layout from './layout.module.css'

const defaultPlayers = [
  { name: 'Buelow', elo: 'diamond', roles: [] },
  { name: 'Cbuelow', elo: 'platinum', roles: ['bot', 'top'] },
  { name: 'LuckyC14', elo: 'silver', roles: ['jug', 'sup'] },
  { name: 'II walter II', elo: 'platinum', roles: ['jug', 'mid'] },
  { name: 'cal420swag', elo: 'gold', roles: ['bot', 'jug'] },
  { name: 'Anti Flaws', elo: 'silver', roles: ['top', 'bot'] },
  { name: 'TurkeyAI', elo: 'platinum', roles: ['top', 'jug'] },
  { name: 'HIPP0B0SS', elo: 'silver', roles: ['top', 'sup'] },
  { name: 'redsledge', elo: 'gold', roles: ['sup'] },
  { name: 'SCANTRON', elo: 'gold', roles: [] },
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

const inputHasErrors = (errors, index) => {
  if (!errors) return false
  const regex = `[${index}].`
  const pattern = new RegExp(regex, 'g')
  return pattern.test(errors)
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
            {errors && (
              <div className="ml-2">
                <span className="text-rose-700 font-semibold uppercase">
                  Errors
                </span>
                <pre className="text-slate-300">{errors}</pre>
              </div>
            )}
            <p className="text-slate-400 uppercase font-medium m-2 text-center">
              Player Pool
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-center justify-items-center m-1">
                {players.map((player, i) => (
                  <Input
                    summoner={player}
                    i={i}
                    error={inputHasErrors(errors, i)}
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
                  <pre className="text-slate-300">{errors}</pre>
                </div>
              )}
              <div className="flex justify-center p-2 m-2">
                <button type="submit" className="btn items-center w-72">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 hidden sm:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Generate Inhouse Lobbies
                </button>
                <button
                  onClick={(e) => handleClear(e)}
                  className="btn items-center w-24"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 hidden sm:block"
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
