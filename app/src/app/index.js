import { useState } from 'react'

import Input from '../components/Input'
import Drafts from '../components/Drafts'
import Footer from '../components/Footer'

import layout from './layout.module.css'

export default function App() {

  const [ errors, setErrors ] = useState(null)
  const [ appState, setAppState ] = useState('input')
  const [ players, setPlayers ] = useState([
    {
      "name": "Buelow",
      "elo": "diamond1",
      "roles": []
    },
    {
      "name": "Cbuelow",
      "elo": "platinum4",
      "roles": ["bot", "top"]
    },
    {
      "name": "luckyc14",
      "elo": "silver3",
      "roles": ["jug", "sup"]
    },
    {
      "name": "walter",
      "elo": "platinum3",
      "roles": ["jug", "mid"]
    },
    {
      "name": "cal420swag",
      "elo": "gold1",
      "roles": ["bot", "jug"]
    },
    {
      "name": "snxckz",
      "elo": "gold4",
      "roles": []
    },
    {
      "name": "TurkeyAI",
      "elo": "platinum1",
      "roles": ["top", "jug"]
    },
    {
      "name": "HIPP0B0SS",
      "elo": "silver3",
      "roles": ["top", "sup"]
    },
    {
      "name": "redsledge",
      "elo": "gold3",
      "roles": ["sup"]
    },
    {
      "name": "deku kid",
      "elo": "gold4",
      "roles": []
    }
  ]) 

  const toggleState = () => {
    if (appState === 'input')
      setAppState('drafts')
    else
      setAppState('input')
  }

  const handleChange = (e, i) => {
    const summoners = players
    if (e.target.name === 'roles')
      summoners[i][e.target.name] = e.target.value.split(',')
    else
      summoners[i][e.target.name] = e.target.value
    setPlayers([...summoners])
  }

  const handleClear = (e) => {
    e.preventDefault()
    setPlayers(Array.from({length: 10}, () => ({name: "", elo: "gold", roles: []})))
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
        {
          appState === 'input' ? 
          <>
            <form onSubmit={handleSubmit}>
              {players.map((player,i) => <Input summoner={player} i={i} handleChange={handleChange} key={i} />)}
              {errors &&
                <pre>
                  {errors}
                </pre>
              }
              <div style={{ padding: '1em', margin: '1em' }}>
                <input type="submit" value="Submit" style={{ padding: '1em', margin: '1em', cursor: 'pointer' }} />
                <button onClick={(e) => handleClear(e)} style={{ padding: '1em', margin: '1em', cursor: 'pointer' }}>Clear</button>
              </div>
            </form>
          </> 
          :
          <Drafts players={players} toggleState={toggleState} setErrors={setErrors} />
        }
      </div>
      <div className={layout.viewFooter}>
        <Footer />
      </div>
    </div>
  );
}