import Image from 'next/image';
import Navbar from './(ui)/Navbar';
import { lusitana } from '@/app/ui/fonts';
import ReloadButton from './(ui)/ReloadButton';
import { getDogs, getCats } from './(data)/animalsAPI';
import { BooksList } from './(ui)/BooksList';

export default async function Page() {
  const dogs = await getDogs();
  const dogImageUrl = dogs.message;
  const cats = await getCats();
  const catImageUrl = cats[0].url;

  return (
    <main className="relative h-screen bg-slate-100 pb-32 pt-32 md:pt-32">
      <Navbar />
      <div className="relative flex flex-col flex-wrap items-center justify-center">
        <div className="flex w-8/12 flex-col items-center justify-center px-4 sm:w-8/12">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={dogImageUrl}
              width={400}
              height={400}
              alt="random dog image"
              className="rounded-2xl h-32 w-32 max-w-full border-none object-cover align-middle shadow"
            />
            <Image
              src={catImageUrl}
              width={400}
              height={400}
              alt="random cat image"
              className="rounded-2xl h-32 w-32 max-w-full border-none object-cover align-middle shadow"
            />
          </div>
          <h1 className={`${lusitana.className} mt-6 text-center`}>
            Random Dog & Cat Image
          </h1>
        </div>
        <ReloadButton />
      </div>
      <BooksList />
      <ul></ul>
    </main>
  );
}
