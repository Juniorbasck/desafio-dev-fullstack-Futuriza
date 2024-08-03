import arrow from "./icons/arrow.png";

export function Header() {

  return(
    <div className="flex text-black items-center justify-between bg-gray-100 px-4 py-3">
    
    <img src={arrow.src} alt="arrow" className="w-5" />

    </div>
  )
}
