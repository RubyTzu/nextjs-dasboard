import Image from "next/image";
import Navbar from "./(ui)/Navbar";
import { lusitana } from "@/app/ui/fonts";
import ReloadButton from "./(ui)/ReloadButton";
import { getDogs, getCats } from "./(data)/animalsAPI";
import { BooksList } from "./(ui)/BooksList";


export default async function Page() {
    const dogs = await getDogs();
    const dogImageUrl = dogs.message;
    const cats = await getCats();
    const catImageUrl = cats[0].url;
console.log(dogImageUrl)
console.log(catImageUrl)
    return (
        <main className="relative bg-slate-100 md:pt-32 pb-32 pt-32 h-screen">
            <Navbar />
            <div className="flex flex-wrap flex-col justify-center items-center relative">
                <div className="flex flex-col justify-center items-center w-8/12 sm:w-8/12 px-4">
                    <div className="flex gap-3 justify-center items-center">
                        <Image
                            src={dogImageUrl}
                            width={400}
                            height={400}
                            alt="random dog image"
                            className="shadow rounded-2xl max-w-full align-middle border-none object-cover h-32 w-32" />
                        <Image
                            src={catImageUrl}
                            width={400}
                            height={400}
                            alt="random cat image"
                            className="shadow rounded-2xl max-w-full align-middle border-none object-cover h-32 w-32" />
                    </div>
                    <h1 className={`${lusitana.className} mt-6 text-center`}>Random Dog & Cat Image</h1>
                </div>
                <ReloadButton />
            </div>
            <BooksList />
            <ul>
     
    </ul>
        </main>
    );
}
