import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import fill from '../img/roles/icon-position-fill.png'
import top from '../img/roles/TOP.png'
import jug from '../img/roles/JUNGLE.png'
import mid from '../img/roles/MIDDLE.png'
import bot from '../img/roles/ADC.png'
import sup from '../img/roles/SUPPORT.png'

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const Option = ({ option, selected, select, close }) => {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)

  // Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

  // Highlighted: "text-white bg-gray-600", Not Highlighted: "text-gray-900"

  if (selected) {
    return (
      <li
        className={clsx(
          'cursor-default select-none relative py-2 pl-3 pr-9',
          hovered && 'text-white bg-gray-600',
          !hovered && 'text-gray-900'
        )}
        id="listbox-option-0"
        role="option"
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
            hovered && 'text-white bg-gray-600',
            !hovered && 'text-gray-600'
          )}
        >
          {/* <!-- Heroicon name: solid/check --> */}
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
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
          ? 'text-white bg-gray-600 cursor-default select-none relative py-2 pl-3 pr-9'
          : 'text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
      }
      id="listbox-option-0"
      role="option"
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

const Select = ({ options, selected, select, setOpen, open, position }) => {
  const ref = useRef(null)
  useOutsideAlerter(ref, setOpen)
  const close = () => {
    setOpen(false)
  }

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
        type="button"
        className="relative w-full h-14 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
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
            className="h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        className={clsx(
          'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
          open && 'block',
          !open && 'hidden'
        )}
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {options.map((x, i) => (
          <Option
            option={x}
            selected={i === selected}
            select={select}
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
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
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
            open={secondaryOpen}
            setOpen={setSecondaryOpen}
            position={'right'}
          />
        )}
      </div>
    </div>
  )
}
