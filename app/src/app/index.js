import func from 'lol-inhouse'
import { useState } from 'react'

import Input from '../components/Input'
import Footer from '../components/Footer'

import { generateOutput, generateAdvancedOutput } from '../utils/output'

import layout from './layout.module.css'

function App() {

  const [ output, setOutput ] = useState(null)
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

  const handleChange = (e, i) => {
    const summoners = players
    if (e.target.name === 'roles')
      summoners[i][e.target.name] = e.target.value.split(',')
    else
      summoners[i][e.target.name] = e.target.value
    setPlayers([...summoners])
  }

  const handleClear = () => {
    setPlayers(Array.from({length: 10}, () => ({name: "", elo: "gold", roles: []})))
    setOutput(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const output = func(players)
      setOutput(`Standard Output: \n ${generateOutput(output[0])} \nVerbose Output: \n ${generateAdvancedOutput(output[0])}`)
    } catch (e) {
      setOutput(e.message)
    }
  }

  return (
    <div className={layout.view}>
      <div className={layout.viewContent}>
        <form onSubmit={handleSubmit}>
          {players.map((player,i) => <Input summoner={player} i={i} handleChange={handleChange} key={i} />)}
          <input type="submit" value="Submit" />
        </form>
        <pre>
          {output}
          <button onClick={handleClear}>Clear</button>
        </pre>
      </div>
      <div className={layout.viewFooter}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
