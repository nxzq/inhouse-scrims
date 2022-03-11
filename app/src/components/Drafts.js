import matchmaking from 'inhouse-scrims'
import { useState, useEffect } from 'react'

import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

import top from '../img/roles/TOP.png'
import jug from '../img/roles/JUNGLE.png'
import mid from '../img/roles/MIDDLE.png'
import bot from '../img/roles/ADC.png'
import sup from '../img/roles/SUPPORT.png'

import iron from '../img/ranks/Season_2019_-_Iron_3-min.png'
import bronze from '../img/ranks/Season_2019_-_Bronze_3-min.png'
import silver from '../img/ranks/Season_2019_-_Silver_3-min.png'
import gold from '../img/ranks/Season_2019_-_Gold_3-min.png'
import platinum from '../img/ranks/Season_2019_-_Platinum_3-min.png'
import diamond from '../img/ranks/Season_2019_-_Diamond_3-min.png'
import master from '../img/ranks/Season_2019_-_Master_3-min.png'
import grandmaster from '../img/ranks/Season_2019_-_Grandmaster_3-min.png'
import challenger from '../img/ranks/Season_2019_-_Challenger_3-min.png'

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

function getOrdinalSuffix(i) {
  const j = i % 10,
    k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

const RoleScore = ({ rank }) => {
  if (rank === 1) {
    return <span className="text-emerald-500 uppercase">Great</span>
  }
  if (rank === 2) {
    return <span className="text-lime-500 uppercase">Good</span>
  }
  return <span className="text-yellow-500 uppercase">Fair</span>
}

const RoleRow = ({
  blue,
  red,
  src,
  alt,
  stackStart = false,
  stackEnd = false,
}) => {
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
    <div className="grid grid-cols-5 md:m-4 lg:mx-20">
      <div
        className={`col-span-2 bg-gradient-to-r from-slate-700 md:rounded-l-full ${
          stackStart ? `rounded-tl-lg` : stackEnd ? `rounded-bl-lg` : ''
        }`}
      >
        <span className="flex items-center">
          <img
            src={ranks[blue.elo]}
            alt={blue.elo}
            className="flex-shrink-0 lg:h-12 lg:w-12 md:h-10 md:w-10 md:block hidden rounded-full"
          />
          <div className="flex flex-col ml-2 items-start">
            <span className="block text-slate-300 line-clamp-1 break-all text-lg md:text-2xl">
              {blue.name}
            </span>
            <span className="text-slate-500 block md:text-md text-sm line-clamp-1">
              MMR: <span className="text-slate-400">{blue.mmr}</span>
            </span>
          </div>
        </span>
      </div>
      <img className="md:h-10 h-8 col-span-1 m-auto" src={src} alt={alt} />
      <div
        className={`col-span-2 w-full bg-gradient-to-l from-slate-700 md:rounded-r-full ${
          stackStart ? `rounded-tr-lg` : stackEnd ? `rounded-br-lg` : ''
        }`}
      >
        <span className="flex justify-end items-center">
          <div className="flex flex-col mr-2 items-end">
            <span className="block text-slate-300 line-clamp-1 break-all text-lg md:text-2xl">
              {red.name}
            </span>
            <span className="text-slate-500 block md:text-md text-sm line-clamp-1">
              MMR: <span className="text-slate-400">{red.mmr}</span>
            </span>
          </div>
          <img
            src={ranks[red.elo]}
            alt={red.elo}
            className="flex-shrink-0 lg:h-12 lg:w-12 md:h-10 md:w-10 md:block hidden rounded-full"
          />
        </span>
      </div>
    </div>
  )
}

function Draft({ lobby }) {
  return (
    <div className="p-0.5 m-0.5 sm:p-1 sm:m-1 md:p-2 md:m-2 lg:mx-12">
      <div className="flex justify-between mb-4 p-2 border-b border-slate-500">
        <p className="bg-gradient-to-r from-blue-300 p-4 rounded-l-sm w-full uppercase font-semibold text-2xl my-auto m-0.5 sm:m-1 md:m-2 lg:mx-16 xl:mx-20 md:block flex flex-col">
          Blue Team
          <span className="text-zinc-900 mt-auto mx-2 md:text-lg text-sm">
            (Total MMR: <span className="text-zinc-800">{lobby.blue.mmr}</span>)
          </span>
        </p>
        <p className="bg-gradient-to-l from-rose-300 p-4 rounded-r-sm w-full uppercase font-semibold text-2xl my-auto m-0.5 sm:m-1 md:m-2 lg:mx-16 xl:mx-20 ml-auto md:flex-row-reverse text-right flex flex-col">
          Red Team
          <span className="text-zinc-900 mt-auto mx-2 md:text-lg text-sm">
            (Total MMR: <span className="text-zinc-800">{lobby.red.mmr}</span>)
          </span>
        </p>
      </div>
      <RoleRow
        blue={lobby.blue.roster.top}
        red={lobby.red.roster.top}
        src={top}
        alt="TOP"
        stackStart={true}
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
        stackEnd={true}
      />
    </div>
  )
}

export default function Drafts({ players, toggleState, setErrors }) {
  const [drafts, setDrafts] = useState(null)
  const [copied, setCopied] = useState(false)
  const [index, setIndex] = useState(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    try {
      const output = matchmaking(players)
      localStorage.setItem('players', JSON.stringify(players))
      let teamDiff = []
      let laneDiff = []
      let totalMMR = []
      let onRole = []
      output.forEach((x) => {
        teamDiff.push(x.metadata.delta)
        laneDiff.push(x.metadata.laneDelta)
        totalMMR.push(x.metadata.skillLevel)
        onRole.push(x.metadata.roleScore)
      })
      const teamDiffSet = [...new Set(teamDiff)].sort((a, b) => a - b)
      const laneDiffSet = [...new Set(laneDiff)].sort((a, b) => a - b)
      const totalMMRSet = [...new Set(totalMMR)].sort((a, b) => b - a)
      const onRoleSet = [...new Set(onRole)].sort((a, b) => b - a)
      setDrafts(
        output.map((x) => {
          return {
            ...x,
            rank: {
              teamDiff: teamDiffSet.indexOf(x.metadata.delta) + 1,
              laneDiff: laneDiffSet.indexOf(x.metadata.laneDelta) + 1,
              role: Math.floor(
                (totalMMRSet.indexOf(x.metadata.skillLevel) +
                  onRoleSet.indexOf(x.metadata.roleScore) +
                  2) /
                  2
              ),
            },
          }
        })
      )
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
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
    if ('clipboard' in navigator)
      return await navigator.clipboard.writeText(text)
    else return document.execCommand('copy', true, text)
  }

  if (processing)
    return (
      <div className="text-slate-400 m-auto">
        <p className="text-center px-6">
          analyzing possible lobbies please wait ...
        </p>
      </div>
    )

  return (
    <div>
      <Draft lobby={drafts[index]} />
      <div className="flex justify-center flex-col items-center m-6 p-2 text-slate-400">
        <div className="text-slate-500 font-semibold uppercase">Metadata</div>
        <div className="ml-1">
          Team MMR Δ:{' '}
          <span className="font-semibold text-slate-500">
            {drafts[index].metadata.delta}
          </span>{' '}
          (Rank:{' '}
          <span className="font-semibold text-slate-500">
            {getOrdinalSuffix(drafts[index].rank.teamDiff)}
          </span>
          )
        </div>
        <div className="ml-1">
          Avg Lane MMR Δ:{' '}
          <span className="font-semibold text-slate-500">
            {Math.floor(drafts[index].metadata.laneDelta / 5)}
          </span>{' '}
          (Rank:{' '}
          <span className="font-semibold text-slate-500">
            {getOrdinalSuffix(drafts[index].rank.laneDiff)}
          </span>
          )
        </div>
        <div className="ml-1">
          Role Preference Score:{' '}
          <span className="font-semibold text-slate-500">
            <RoleScore rank={drafts[index].rank.role} />
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-wrap mx-4 mt-4 p-2 lg:mx-12">
        <button
          onClick={() => changeIndex(-1)}
          disabled={index === 0}
          className="btn w-28"
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
        <div className="bg-slate-700 text-slate-400 rounded-full p-2 m-2 mx-0">
          {index + 1} / {drafts.length}
        </div>
        <button
          onClick={() => changeIndex(1)}
          disabled={index + 1 === drafts.length}
          className="btn w-28"
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
        <Tooltip title="lobby copied to clipboard" position="top" open={copied}>
          <button onClick={copy} className="btn w-56">
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Current Lobby
          </button>
        </Tooltip>
        <button onClick={() => toggleState()} className="btn w-64">
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
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          Return to Player Selection
        </button>
      </div>
    </div>
  )
}
