"use client"
import clsx from "clsx";
import { useRouter } from "next/navigation"

export default function SuccessAlert({ text, name,isShow, setIsShow }: { text: string; name: string; isShow: boolean; setIsShow: Function }) {
    const router = useRouter();
    const handleClick = () => {
        setIsShow(false)
        router.refresh()
    }

    return (
    <div>
        <div className={`w-12 h-12 absolute z-30 top-0 left-0 transition-all duration-[300ms] ease-in-out ${isShow ? 'bg-black' : 'bg-white'}`}></div>
        <div className="z-20 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex w-72 shadow-lg rounded-lg">
            <div className="bg-primary-300 py-4 px-6 rounded-l-lg flex items-center">
                <button onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-grey-300 fill-current" viewBox="0 0 16 16" width="20" height="20"><path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                </button>
            </div>
            <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                <div>{text}<br />{name}</div>
                <button onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-grey-300" viewBox="0 0 16 16" width="20" height="20"><path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                </button>
            </div>
        </div>
        <div onClick={handleClick} className="absolute z-10 top-[0%] left-[0%] bg-[#0009] h-full w-full"></div>
    </div>
    )
}