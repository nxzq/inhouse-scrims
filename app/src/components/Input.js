import SelectRank from '../components/SelectRank'
import SelectRole from '../components/SelectRole'

export default function SummonerInput({ summoner, i, handleChange }) {
  return (
    <div className="relative max-w-6xl m-2 py-1 px-2 bg-slate-700 rounded-sm">
      <div className="md:flex">
        <div className="m-2 p-2 md:w-64">
          <div>
            <label
              id={`player-${i + 1}-name`}
              className="block text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={summoner.name}
                name="name"
                aria-labelledby={`player-${i + 1}-name`}
                onChange={(e) => handleChange(e, i)}
                className="relative w-full h-14 text-slate-300 bg-slate-800 border border-slate-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="m-2 p-2 md:w-52">
          <SelectRank elo={summoner.elo} i={i} handleChange={handleChange} />
        </div>
        <div className="m-2 p-2 w-72">
          <SelectRole
            roles={summoner.roles}
            i={i}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
