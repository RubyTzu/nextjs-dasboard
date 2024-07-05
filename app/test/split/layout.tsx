import Navbar from '../(ui)/Navbar';
import { Providers } from '@/app/test/(data)/(fetchData)/Providers';
import { CalcProvider } from '@/app/test/(data)/(sharedFunction)/CalcProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <CalcProvider>
          <main className="h-dvh min-h-screen w-full bg-primary-100">
            {children}
          </main>
        </CalcProvider>
      </Providers>
    </>
  );
}
