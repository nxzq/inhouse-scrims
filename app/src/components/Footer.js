import githubIcon from '../img/github.svg'

export default function Footer() {
  return (
    <div className="flex flex-wrap w-full justify-center text-md p-2">
      <p className="text-slate-400 text-center mx-2">
        open source league of legends inhouse scrims matchmaking
      </p>
      <a href="https://github.com/exclamationpointhuman/inhouse-scrims/tree/main/module">
        <p className="text-slate-500 hover:text-slate-600 hover:underline mx-2 flex items-center justify-center">
          <img src={githubIcon} alt="" className="w-5 h-5" />
          &nbsp;view algorithm here
        </p>
      </a>
    </div>
  )
}
