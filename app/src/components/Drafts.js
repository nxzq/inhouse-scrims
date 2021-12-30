import func from 'lol-inhouse'
import { useState, useEffect } from 'react'

import top from '../img/roles/TOP.png'
import jug from '../img/roles/JUNGLE.png'
import mid from '../img/roles/MIDDLE.png'
import bot from '../img/roles/ADC.png'
import sup from '../img/roles/SUPPORT.png'

import iron from '../img/ranks/Season_2019_-_Iron_4.png'
import bronze from '../img/ranks/Season_2019_-_Bronze_4.png'
import silver from '../img/ranks/Season_2019_-_Silver_4.png'
import gold from '../img/ranks/Season_2019_-_Gold_4.png'
import platinum from '../img/ranks/Season_2019_-_Platinum_4.png'
import diamond from '../img/ranks/Season_2019_-_Diamond_4.png'
import master from '../img/ranks/Season_2019_-_Master_4.png'
import grandmaster from '../img/ranks/Season_2019_-_Grandmaster_4.png'
import challenger from '../img/ranks/Season_2019_-_Challenger_4.png'

const copyOutput = (inhouse) => {
  const blue = inhouse.blue
  const red = inhouse.red
  const padding =
    Math.max(
      ...[
        ...Object.keys(red.roster).map((x) => red.roster[x].name.length),
        ...Object.keys(blue.roster).map((x) => blue.roster[x].name.length),
      ]
    ) + 10
  return `\`\`\`
  |${'-'.padEnd((padding + 1) * 2, '-')}|
  | ${'BLUE SIDE'}${''.padEnd(padding * 2 - 17)}${'RED SIDE'} |
  |${'-'.padEnd((padding + 1) * 2, '-')}|
  | ${blue.roster.top.name}${'TOP'.padStart(
    padding - blue.roster.top.name.length
  )}${''.padEnd(padding - red.roster.top.name.length)}${red.roster.top.name} |
  | ${blue.roster.jug.name}${'JUG'.padStart(
    padding - blue.roster.jug.name.length
  )}${''.padEnd(padding - red.roster.jug.name.length)}${red.roster.jug.name} |
  | ${blue.roster.mid.name}${'MID'.padStart(
    padding - blue.roster.mid.name.length
  )}${''.padEnd(padding - red.roster.mid.name.length)}${red.roster.mid.name} |
  | ${blue.roster.bot.name}${'BOT'.padStart(
    padding - blue.roster.bot.name.length
  )}${''.padEnd(padding - red.roster.bot.name.length)}${red.roster.bot.name} |
  | ${blue.roster.sup.name}${'SUP'.padStart(
    padding - blue.roster.sup.name.length
  )}${''.padEnd(padding - red.roster.sup.name.length)}${red.roster.sup.name} |
  |${'-'.padEnd((padding + 1) * 2, '-')}|
\`\`\``
}

const RoleRow = ({ blue, red, src, alt }) => {
  const ranks = {
    Iron: iron,
    Bronze: bronze,
    Silver: silver,
    Gold: gold,
    Platinum: platinum,
    Diamond: diamond,
    Master: master,
    Grandmaster: grandmaster,
    Challenger: challenger,
  }

  return (
    <div className="grid grid-cols-5 md:m-2 min-w-full max-w-full">
      <div className="col-span-2">
        <span className="flex items-center">
          <img
            src={ranks[blue.elo]}
            alt=""
            className="flex-shrink-0 d:h-10 md:w-10 md:block hidden rounded-full"
          />
          <div className="flex flex-col ml-3 items-start">
            <span className="block line-clamp-1 md:text-2xl">{blue.name}</span>
            <span className="text-gray-400 block md:text-md text-sm line-clamp-1">
              Est. MMR: <span className="text-gray-500">{blue.mmr}</span>
            </span>
          </div>
        </span>
      </div>
      <img className="md:h-10 h-8 col-span-1 m-auto" src={src} alt={alt} />
      <div className="col-span-2 ml-auto">
        <span className="flex items-center">
          <div className="flex flex-col mr-3 items-end">
            <span className="block line-clamp-1 md:text-2xl">{red.name}</span>
            <span className="text-gray-400 block md:text-md text-sm line-clamp-1">
              Est. MMR: <span className="text-gray-500">{red.mmr}</span>
            </span>
          </div>
          <img
            src={ranks[red.elo]}
            alt=""
            className="flex-shrink-0 md:h-10 md:w-10 md:block hidden rounded-full"
          />
        </span>
      </div>
    </div>
  )
}

function Draft({ lobby }) {
  return (
    <div className="p-2 m-2">
      <div className="flex justify-between mb-2">
        <p className="text-2xl mx-auto md:block flex flex-col">
          🔵 Blue Team{' '}
          <span className="text-gray-400 mx-auto md:text-lg text-sm">
            (Total MMR: <span className="text-gray-500">{lobby.blue.mmr}</span>)
          </span>
        </p>
        <p className="text-2xl mx-auto md:block flex flex-col">
          🔴 Red Team{' '}
          <span className="text-gray-400 mx-auto md:text-lg text-sm">
            (Total MMR: <span className="text-gray-500">{lobby.red.mmr}</span>)
          </span>
        </p>
      </div>
      <RoleRow
        blue={lobby.blue.roster.top}
        red={lobby.red.roster.top}
        src={top}
        alt="TOP"
      />
      <RoleRow
        blue={lobby.blue.roster.jug}
        red={lobby.red.roster.jug}
        src={jug}
        alt="JUG"
      />
      <RoleRow
        blue={lobby.blue.roster.mid}
        red={lobby.red.roster.mid}
        src={mid}
        alt="MID"
      />
      <RoleRow
        blue={lobby.blue.roster.bot}
        red={lobby.red.roster.bot}
        src={bot}
        alt="BOT"
      />
      <RoleRow
        blue={lobby.blue.roster.sup}
        red={lobby.red.roster.sup}
        src={sup}
        alt="SUP"
      />
    </div>
  )
}

export default function Drafts({ players, toggleState, setErrors }) {
  const [drafts, setDrafts] = useState(null)
  const [index, setIndex] = useState(null)
  const [processing, setProcessing] = useState(true)

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
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  if (processing)
    return (
      <div className="text-gray-500 m-auto">
        <p>analyzing 1,814,400 possible lobbies please wait ...</p>
      </div>
    )

  return (
    <div>
      <Draft lobby={drafts[index]} />
      <div style={{ padding: '1em', margin: '1em' }}>
        <p>
          Draft {index + 1} of {drafts.length} suitable lobbies
        </p>
      </div>
      <div
        style={{
          padding: '1em',
          margin: '1em',
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <button onClick={copy} className="btn flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
        <button
          onClick={() => changeIndex(-1)}
          disabled={index === 0}
          className="btn flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Previous
        </button>
        <button
          onClick={() => changeIndex(1)}
          disabled={index + 1 === drafts.length}
          className="btn flex"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
        <button onClick={() => toggleState()} className="btn">
          Back
        </button>
      </div>
    </div>
  )
}
