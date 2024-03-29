import githubIcon from '../img/github.svg'

export default function Footer() {
  return (
    <div className="flex flex-wrap w-full justify-center text-sm p-2">
      <p className="text-slate-400 text-center mx-2 flex items-center justify-center">
        open source league of legends inhouse scrims matchmaking
      </p>
      <a
        href="https://github.com/nxzq/inhouse-scrims"
        className="text-slate-500 hover:underline"
      >
        <p className="text-slate-500 text-center mx-2 flex items-center justify-center">
          <img src={githubIcon} alt="github" className="w-4 h-4 mr-1" />
          code
        </p>
      </a>
    </div>
  )
}
