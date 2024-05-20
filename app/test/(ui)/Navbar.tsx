import Image from "next/image";
import back from "@/app/test/(ui)/back.svg";
import doubleLine from "@/app/test/(ui)/doubleLine.svg";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 w-full h-20 bg-slate-100 absolute top-0">
            <Image src={back}
                alt="back" height={30} width={30} className="cursor-pointer"/>
            <Image src={doubleLine}
                alt="double line" height={30} width={30} className="cursor-pointer"/>
        </div>
    )
}

