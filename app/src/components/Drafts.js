import func from 'lol-inhouse'
import { useState, useEffect } from 'react'

const copyOutput = (inhouse) => {
  const blue = inhouse.blue
  const red = inhouse.red
  const padding = Math.max(...[...Object.keys(red.roster).map(x => red.roster[x].name.length),...Object.keys(blue.roster).map(x => blue.roster[x].name.length)]) + 10
  return `\`\`\`
  |${'-'.padEnd((padding+1)*2,'-')}|
  | ${'BLUE SIDE'}${''.padEnd(padding*2-17)}${'RED SIDE'} |
  |${'-'.padEnd((padding+1)*2,'-')}|
  | ${blue.roster.top.name}${'TOP'.padStart(padding-blue.roster.top.name.length)}${''.padEnd(padding-red.roster.top.name.length)}${red.roster.top.name} |
  | ${blue.roster.jug.name}${'JUG'.padStart(padding-blue.roster.jug.name.length)}${''.padEnd(padding-red.roster.jug.name.length)}${red.roster.jug.name} |
  | ${blue.roster.mid.name}${'MID'.padStart(padding-blue.roster.mid.name.length)}${''.padEnd(padding-red.roster.mid.name.length)}${red.roster.mid.name} |
  | ${blue.roster.bot.name}${'BOT'.padStart(padding-blue.roster.bot.name.length)}${''.padEnd(padding-red.roster.bot.name.length)}${red.roster.bot.name} |
  | ${blue.roster.sup.name}${'SUP'.padStart(padding-blue.roster.sup.name.length)}${''.padEnd(padding-red.roster.sup.name.length)}${red.roster.sup.name} |
  |${'-'.padEnd((padding+1)*2,'-')}|
\`\`\``
}

function Draft ({lobby}) {
  return (
    <div style={{ padding: '1em', margin: '1em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
        <p>🔵 Blue Team</p>
        <p>🔴 Red Team</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{lobby.blue.roster.top.name}</p>
        <p>TOP</p>
        <p>{lobby.red.roster.top.name}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{lobby.blue.roster.jug.name}</p>
        <p>JUG</p>
        <p>{lobby.red.roster.jug.name}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{lobby.blue.roster.mid.name}</p>
        <p>MID</p>
        <p>{lobby.red.roster.mid.name}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{lobby.blue.roster.bot.name}</p>
        <p>BOT</p>
        <p>{lobby.red.roster.bot.name}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{lobby.blue.roster.sup.name}</p>
        <p>SUP</p>
        <p>{lobby.red.roster.sup.name}</p>
      </div>
    </div>
  )
}

export default function Drafts({ players, toggleState, setErrors }) {

  const [ drafts, setDrafts ] = useState(null)
  const [ index, setIndex ] = useState(null)
  const [ processing, setProcessing ] = useState(true)

  useEffect(() => {
    try {
      const output = func(players)
      localStorage.setItem('players', JSON.stringify(players))
      setDrafts(output)
      setIndex(0)
      setProcessing(false)
    } catch (e) {
      setErrors(e.message)
      toggleState()
    }
  }, [players, setErrors, toggleState])

  const changeIndex = (val) => {
    setIndex(index + val)
  }

  const copy = async () => {
    const text = copyOutput(drafts[index])
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  if (processing)
    return (
      <div style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-50px',
        width: '100px',
        height: '100px' 
      }}>
        processing ... 
      </div>
    )

  return (
    <div>
      <Draft lobby={drafts[index]} />
      <div style={{ padding: '1em', margin: '1em' }}>
        <p>Draft {index + 1} of {drafts.length} suitable lobbies</p>
      </div>
      <div style={{ padding: '1em', margin: '1em', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        <button onClick={copy}>Copy</button>
        <button onClick={() => changeIndex(-1)} disabled={index === 0}>Previous</button>
        <button onClick={() => changeIndex(1)} disabled={index+1 === drafts.length}>Next</button>
        <button onClick={() => toggleState()}>Back</button>
      </div>
    </div>
  );
}