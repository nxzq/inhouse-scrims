import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import fill from '../img/roles/icon-position-fill.png'
import top from '../img/roles/TOP.png'
import jug from '../img/roles/JUNGLE.png'
import mid from '../img/roles/MIDDLE.png'
import bot from '../img/roles/ADC.png'
import sup from '../img/roles/SUPPORT.png'

const handleTab = (e, setOpen, select, selected, value, index, length) => {
  if (e.keyCode === 13 && !selected) select(value)
  else if (e.keyCode === 9 && index + 1 === length) setOpen(false)
  else if (e.shiftKey && e.keyCode === 9 && index === 0) setOpen(false)
}

const Option = ({ option, selected, select, handleTab, close }) => {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)

  if (selected) {
    return (
      <li
        className={clsx(
          'cursor-default select-none relative py-2 pl-3 pr-9',
          hovered && 'text-slate-300 bg-slate-700',
          !hovered && 'text-slate-300 bg-slate-800'
        )}
        id={`role-option-${option.name}`}
        tabIndex="0"
        onKeyDown={(e) => handleTab(e)}
        role="option"
        aria-selected="true"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={close}
      >
        <div className="flex items-center">
          {option.src ? (
            <>
              <div className="flex justify-around flex-shrink-0">
                <img src={option.src} alt="" className="h-6 w-6 rounded-full" />
              </div>
              <span className="font-semibold ml-3 block truncate">
                {option.name}
              </span>
            </>
          ) : (
            <>
              <div className="ml-3" />
              <span className="font-semibold block truncate m-auto">
                {option.name}
              </span>
            </>
          )}
        </div>
        <span
          className={clsx(
            'absolute inset-y-0 right-0 flex items-center pr-4',
            hovered && 'text-slate-300 bg-slate-700',
            !hovered && 'text-slate-300 bg-slate-800'
          )}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </li>
    )
  }

  return (
    <li
      className={
        hovered
          ? 'text-slate-300 bg-slate-700 cursor-default select-none relative py-2 pl-3 pr-9'
          : 'text-slate-300 bg-slate-800 cursor-default select-none relative py-2 pl-3 pr-9'
      }
      id={`role-option-${option.name}`}
      tabIndex="0"
      onKeyDown={(e) => handleTab(e)}
      role="option"
      aria-selected="false"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={() => select(option.value)}
    >
      <div className="flex items-center">
        {option.src ? (
          <>
            <div className="flex justify-around flex-shrink-0">
              <img src={option.src} alt="" className="h-6 w-6 rounded-full" />
            </div>
            <span className="ml-3 block truncate">{option.name}</span>
          </>
        ) : (
          <>
            <div className="ml-3" />
            <span className="block truncate m-auto">{option.name}</span>
          </>
        )}
      </div>
    </li>
  )
}

const handleTabOut = (e, open, setOpen) => {
  if (e.shiftKey && e.keyCode === 9 && open) {
    setOpen(false)
  }
}

const Select = ({ options, selected, select, i, setOpen, open, position }) => {
  const ref = useRef(null)
  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, setOpen])

  return (
    <div
      ref={ref}
      className={clsx(
        'mt-1 relative',
        position === 'full' && 'col-span-2',
        position === 'right' && 'col-span-1',
        position === 'left' && 'col-span-1'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => handleTabOut(e, open, setOpen)}
        type="button"
        className="relative w-full h-14 bg-slate-800 text-slate-300 border border-slate-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby={`player-${i + 1}-roles`}
      >
        <span
          className={clsx(
            'flex items-center',
            position === 'full' && 'justify-center'
          )}
        >
          {options[selected].src ? (
            <>
              <div className="flex justify-around flex-shrink-0">
                <img
                  src={options[selected].src}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              </div>
              <span className="ml-3 block truncate">
                {options[selected].name}
              </span>
            </>
          ) : (
            <>
              <div className="ml-3" />
              <span className="block truncate m-auto">
                {options[selected].name}
              </span>
            </>
          )}
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        className={clsx(
          'absolute z-10 mt-1 w-full bg-slate-800 border border-slate-500 max-h-56 rounded-md py-1 text-base ring-1 ring-slate-500 overflow-auto focus:outline-none sm:text-sm',
          open && 'block',
          !open && 'hidden'
        )}
        tabIndex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {options.map((x, i) => (
          <Option
            option={x}
            selected={i === selected}
            select={select}
            handleTab={(e) =>
              handleTab(
                e,
                setOpen,
                select,
                i === selected,
                x.value,
                i,
                options.length
              )
            }
            close={close}
            key={i}
          />
        ))}
      </ul>
    </div>
  )
}

export default function SelectRole({ roles, i, handleChange }) {
  const select = (value, roles, role) => {
    if (role === 'primary') {
      if (JSON.stringify(value) === JSON.stringify([])) roles = []
      else if (value[0] === secondaryValue) roles = [value[0], roles[0]]
      else roles[0] = value[0]
    } else if (role === 'secondary') {
      if (JSON.stringify(value) === JSON.stringify([null]))
        roles = roles.slice(0, 1)
      else roles[1] = value[0]
    }
    const e = {
      target: {
        name: 'roles',
        value: roles,
      },
    }
    handleChange(e, i)
    if (role === 'primary') setPrimaryOpen(false)
    if (role === 'secondary') setSecondaryOpen(false)
  }

  const primaryOptions = [
    { value: [], name: 'Fill', src: [fill] },
    { value: ['top'], name: 'TOP', src: top },
    { value: ['jug'], name: 'JUG', src: jug },
    { value: ['mid'], name: 'MID', src: mid },
    { value: ['bot'], name: 'BOT', src: bot },
    { value: ['sup'], name: 'SUP', src: sup },
  ]
  const secondaryOptions = [
    { value: [null], name: '-' },
    { value: ['top'], name: 'TOP', src: top },
    { value: ['jug'], name: 'JUG', src: jug },
    { value: ['mid'], name: 'MID', src: mid },
    { value: ['bot'], name: 'BOT', src: bot },
    { value: ['sup'], name: 'SUP', src: sup },
  ].filter((x) => JSON.stringify(x.value) !== JSON.stringify([roles[0]]))
  const [primaryOpen, setPrimaryOpen] = useState(false)
  const [secondaryOpen, setSecondaryOpen] = useState(false)
  const primaryValue = roles[0]
  const secondaryValue = roles[1] || null

  return (
    <div>
      <label
        id={`player-${i + 1}-roles`}
        className="block text-sm font-medium text-slate-300"
      >
        Roles
      </label>
      <div className="grid grid-cols-2 gap-2">
        <Select
          options={primaryOptions}
          selected={primaryOptions.findIndex(
            (x) =>
              JSON.stringify(x.value) ===
              JSON.stringify(primaryValue ? [primaryValue] : [])
          )}
          select={(value) => select(value, roles, 'primary')}
          open={primaryOpen}
          setOpen={setPrimaryOpen}
          position={primaryValue ? 'left' : 'full'}
        />
        {primaryValue && (
          <Select
            options={secondaryOptions}
            selected={secondaryOptions.findIndex(
              (x) =>
                JSON.stringify(x.value) === JSON.stringify([secondaryValue])
            )}
            select={(value) => select(value, roles, 'secondary')}
            i={i}
            open={secondaryOpen}
            setOpen={setSecondaryOpen}
            position={'right'}
          />
        )}
      </div>
    </div>
  )
}
