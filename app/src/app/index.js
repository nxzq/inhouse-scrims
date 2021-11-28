import func from 'lol-inhouse'
import { useState } from 'react'

import Input from '../components/Input'

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

  /**
   * Verbose string output
   * @param {*} inhouse 
   * @returns 
   */
  const generateAdvancedOutput = (inhouse) => {
    const blue = inhouse.blue
    const red = inhouse.red
    const namePadding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].name.length),...Object.keys(blue.roster).map(x => blue.roster[x].name.length)]) + 10
    const eloPadding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].elo.length),...Object.keys(blue.roster).map(x => blue.roster[x].elo.length)]) + 2
    return `
    |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
    | ${'🔵 BLUE SIDE'}${''.padEnd((namePadding*2)+(eloPadding*2)+2)}${'🔴 RED SIDE'} |
    |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
    | - | ELO ${''.padEnd(eloPadding-5)}| MMR  | PLAYER ${''.padEnd(namePadding*2-14)} PLAYER |  MMR |${''.padEnd(eloPadding-4)} ELO | - |
    |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
    | ${blue.roster.top.autofill ? '*' : '✔'} | ${blue.roster.top.elo}${'|'.padStart(eloPadding - blue.roster.top.elo.length)} ${blue.roster.top.mmr} ${'|'.padStart(5 - blue.roster.top.mmr.toString().length)} ${blue.roster.top.name}${'TOP'.padStart(namePadding-blue.roster.top.name.length)}${''.padEnd(namePadding-red.roster.top.name.length)}${red.roster.top.name} ${'|'.padEnd(5 - red.roster.top.mmr.toString().length)} ${red.roster.top.mmr} ${'|'.padEnd(eloPadding - red.roster.top.elo.length)} ${red.roster.top.elo} | ${red.roster.top.autofill ? '*' : '✔'} |
    | ${blue.roster.jug.autofill ? '*' : '✔'} | ${blue.roster.jug.elo}${'|'.padStart(eloPadding - blue.roster.jug.elo.length)} ${blue.roster.jug.mmr} ${'|'.padStart(5 - blue.roster.jug.mmr.toString().length)} ${blue.roster.jug.name}${'JUG'.padStart(namePadding-blue.roster.jug.name.length)}${''.padEnd(namePadding-red.roster.jug.name.length)}${red.roster.jug.name} ${'|'.padEnd(5 - red.roster.jug.mmr.toString().length)} ${red.roster.jug.mmr} ${'|'.padEnd(eloPadding - red.roster.jug.elo.length)} ${red.roster.jug.elo} | ${red.roster.jug.autofill ? '*' : '✔'} |
    | ${blue.roster.mid.autofill ? '*' : '✔'} | ${blue.roster.mid.elo}${'|'.padStart(eloPadding - blue.roster.mid.elo.length)} ${blue.roster.mid.mmr} ${'|'.padStart(5 - blue.roster.mid.mmr.toString().length)} ${blue.roster.mid.name}${'MID'.padStart(namePadding-blue.roster.mid.name.length)}${''.padEnd(namePadding-red.roster.mid.name.length)}${red.roster.mid.name} ${'|'.padEnd(5 - red.roster.mid.mmr.toString().length)} ${red.roster.mid.mmr} ${'|'.padEnd(eloPadding - red.roster.mid.elo.length)} ${red.roster.mid.elo} | ${red.roster.mid.autofill ? '*' : '✔'} |
    | ${blue.roster.bot.autofill ? '*' : '✔'} | ${blue.roster.bot.elo}${'|'.padStart(eloPadding - blue.roster.bot.elo.length)} ${blue.roster.bot.mmr} ${'|'.padStart(5 - blue.roster.bot.mmr.toString().length)} ${blue.roster.bot.name}${'BOT'.padStart(namePadding-blue.roster.bot.name.length)}${''.padEnd(namePadding-red.roster.bot.name.length)}${red.roster.bot.name} ${'|'.padEnd(5 - red.roster.bot.mmr.toString().length)} ${red.roster.bot.mmr} ${'|'.padEnd(eloPadding - red.roster.bot.elo.length)} ${red.roster.bot.elo} | ${red.roster.bot.autofill ? '*' : '✔'} |
    | ${blue.roster.sup.autofill ? '*' : '✔'} | ${blue.roster.sup.elo}${'|'.padStart(eloPadding - blue.roster.sup.elo.length)} ${blue.roster.sup.mmr} ${'|'.padStart(5 - blue.roster.sup.mmr.toString().length)} ${blue.roster.sup.name}${'SUP'.padStart(namePadding-blue.roster.sup.name.length)}${''.padEnd(namePadding-red.roster.sup.name.length)}${red.roster.sup.name} ${'|'.padEnd(5 - red.roster.sup.mmr.toString().length)} ${red.roster.sup.mmr} ${'|'.padEnd(eloPadding - red.roster.sup.elo.length)} ${red.roster.sup.elo} | ${red.roster.sup.autofill ? '*' : '✔'} |
    |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
    | ${blue.mmr}${'TOTAL MMR'.padStart(namePadding+eloPadding+15-blue.mmr.toString().length)}${''.padEnd(namePadding+eloPadding+10-red.mmr.toString().length)}${red.mmr} |
    |${'-'.padEnd(((namePadding*2)+(eloPadding*2)+50-23),'-')}|
      ✔ denotes on-role
      * denotes autofill
    `
  }

  const handleChange = (e, i) => {
    const summoners = players
    if (e.target.name === 'roles')
      summoners[i][e.target.name] = e.target.value.split(',')
    else
      summoners[i][e.target.name] = e.target.value
    setPlayers([...summoners])
  }

  const handleClear = () => {
    setPlayers(new Array(10).fill({name: "", elo: "gold", roles: []}))
    setOutput(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const output = func(players)
      setOutput(generateAdvancedOutput(output[0]))
    } catch (e) {
      setOutput(e.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {players.map((player,i) => <Input summoner={player} i={i} handleChange={handleChange} key={i} />)}
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleClear}>Clear</button>
      <pre>
        {output}
      </pre>
    </div>
  );
}

export default App;
