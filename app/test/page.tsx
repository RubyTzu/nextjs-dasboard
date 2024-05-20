import Image from "next/image";
import Navbar from "./(ui)/Navbar";
import {lusitana} from "@/app/ui/fonts"
import ReloadButton from "./(ui)/ReloadButton";

async function getDogs() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random", {
        cache: "no-cache",
    });


    const data = await response.json();
    return data
}

export default async function Page() {
    const dogs = await getDogs();
    const dogImageUrl = dogs.message;
    console.log(dogImageUrl);


    return (
        <main className="relative bg-slate-100 md:pt-32 pb-32 pt-32 h-screen">
            <Navbar />
            <div className="flex flex-wrap flex-col justify-center items-center relative top-[20px]">
                <div className="flex flex-col justify-center items-center w-8/12 sm:w-8/12 px-4">
                    <Image
                        src={dogImageUrl}
                        width={400}
                        height={400}
                        alt="random dog image"
                        className="shadow rounded-2xl max-w-full align-middle border-none object-cover h-64 w-64"
                    />
                    <h1 className={`mt-6 text-center ${lusitana.className}`}>Random Dog Image</h1>
                    {/* <div className="flex mt-10">
                        <div className="bg-[#999999] w-[8px] h-[8px] border rounded-full mr-[3px]"></div>
                        <div className="bg-[#CFCFCF] w-[8px] h-[8px] border rounded-full mr-[3px]"></div>
                        <div className="bg-[#CFCFCF] w-[8px] h-[8px] border rounded-full"></div>
                    </div> */}
                </div>
           <ReloadButton />
            </div>
        </main>
    );
}

