import BackButton from "@/app/test/(ui)/BackButton";
import DoubleLineButton from "@/app/test/(ui)/DoubleLineButton";


export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 w-full h-16 bg-slate-100 absolute top-0">
           <BackButton />
           <DoubleLineButton />
        </div>
    )
}

