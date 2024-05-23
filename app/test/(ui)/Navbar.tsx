import BackButton from "@/app/test/(ui)/BackButton";
import DoubleLineButton from "@/app/test/(ui)/DoubleLineButton";


export default function Navbar() {
    return (
        <div className="z-[100] fixed top-0 left-0 right-0 flex justify-between items-center px-6 w-full h-16 bg-slate-100">
           <BackButton />
           <DoubleLineButton />
        </div>
    )
}

