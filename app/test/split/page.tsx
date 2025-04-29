'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAllContext } from '../(data)/(fetchData)/Providers';
import { KVLoading } from '../(ui)/KVLoading';


export default function HomePage() {
  const { setLoginUserId } = useAllContext();

  const router = useRouter();
   
  useEffect(() => {
    const userId ="u10"
      window.localStorage.setItem('loginUserId', userId);

      setLoginUserId(userId);
      setTimeout(()=>{
        router.push('/test/split/groups');
      },2000)
    }, []);
  
  
  return (
    <main className="relative z-[2] mx-auto mt-0 w-screen min-w-[320px] text-center text-3xl">
      <KVLoading />
    </main>
  );
}
