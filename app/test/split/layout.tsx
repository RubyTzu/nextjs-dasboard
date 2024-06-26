import Navbar from '../(ui)/Navbar';
import { Providers } from '@/app/test/(data)/Providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <main className="h-dvh min-h-screen w-full bg-primary-100">
          {children}
        </main>
      </Providers>
    </>
  );
}
