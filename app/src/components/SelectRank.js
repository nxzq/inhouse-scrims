import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import iron from '../img/ranks/Season_2019_-_Iron_4.png'
import bronze from '../img/ranks/Season_2019_-_Bronze_4.png'
import silver from '../img/ranks/Season_2019_-_Silver_4.png'
import gold from '../img/ranks/Season_2019_-_Gold_4.png'
import platinum from '../img/ranks/Season_2019_-_Platinum_4.png'
import diamond from '../img/ranks/Season_2019_-_Diamond_4.png'
import master from '../img/ranks/Season_2019_-_Master_4.png'
import grandmaster from '../img/ranks/Season_2019_-_Grandmaster_4.png'
import challenger from '../img/ranks/Season_2019_-_Challenger_4.png'

const Option = ({ option, selected, select, close }) => {
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)

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
        aria-selected="true"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={close}
      >
        <div className="flex items-center">
          <img src={option.src} alt="" className="h-8 w-8 rounded-full" />
          <span className="font-semibold ml-3 block truncate">
            {option.name}
          </span>
        </div>
        <span
          className={clsx(
            'absolute inset-y-0 right-0 flex items-center pr-4',
            hovered && 'text-white bg-gray-600',
            !hovered && 'text-gray-600'
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
      aria-selected="false"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={() => select(option.value)}
    >
      <div className="flex items-center">
        <img src={option.src} alt="" className="h-8 w-8 rounded-full" />
        <span className="font-normal ml-3 block truncate">{option.name}</span>
      </div>
    </li>
  )
}

export default function SelectRank({ elo, i, handleChange }) {
  const select = (value) => {
    const e = {
      target: {
        name: 'elo',
        value,
      },
    }
    handleChange(e, i)
    setOpen(false)
  }

  const options = [
    { value: 'iron', name: 'Iron', src: iron },
    { value: 'bronze', name: 'Bronze', src: bronze },
    { value: 'silver', name: 'Silver', src: silver },
    { value: 'gold', name: 'Gold', src: gold },
    { value: 'platinum', name: 'Platinum', src: platinum },
    { value: 'diamond', name: 'Diamond', src: diamond },
    { value: 'master', name: 'Master', src: master },
    { value: 'grandmaster', name: 'Grandmaster', src: grandmaster },
    { value: 'challenger', name: 'Challenger', src: challenger },
  ]
  const [open, setOpen] = useState(false)
  const selected = options
    .map((x, i) => (x.value === elo ? i : null))
    .filter((x) => x)[0]
  const ref = useRef(null)

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
    <div ref={ref}>
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        Elo
      </label>
      <div className="mt-1 relative">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="relative w-full h-14 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <span className="flex items-center">
            <img
              src={options[selected].src}
              alt=""
              className="flex-shrink-0 h-8 w-8 rounded-full"
            />
            <span className="ml-3 block truncate">
              {options[selected].name}
            </span>
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
              close={() => setOpen(false)}
              key={i}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
