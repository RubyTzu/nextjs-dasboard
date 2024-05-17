import Image from "next/image";

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
        <main className="relative bg-pink-100 md:pt-32 pb-32 pt-32 h-screen">
            <div className="flex flex-wrap flex-col justify-center items-center">
                <div className="w-6/12 sm:w-4/12 px-4">
                    <Image
                        src={dogImageUrl}
                        width={400}
                        height={400}
                        alt="random dog image"
                        className="shadow rounded-2xl max-w-full align-middle border-none object-cover h-80 w-80"
                    />
                </div>
                <h1 className="mt-6">Random Dog Image</h1>
            </div>
        </main>
    );
}

