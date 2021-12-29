import SelectRank from '../components/SelectRank'
import SelectRole from '../components/SelectRole'

export default function SummonerInput({ summoner, i, handleChange }) {
  return (
    <div className="relative max-w-6xl m-2 py-2 px-4 bg-gray-50 shadow-md rounded-lg">
      <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-600 rounded-full p-1 mr-4 mt-1">
        Player {i + 1}
      </div>
      <div className="md:flex">
        <div className="m-2 p-2 w-64">
          <div>
            <label
              id="listbox-label"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={summoner.name}
                name="name"
                onChange={(e) => handleChange(e, i)}
                className="relative w-full h-14 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="m-2 p-2 w-52">
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
