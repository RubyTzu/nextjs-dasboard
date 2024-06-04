import Navbar from "../(ui)/Navbar";
import { Providers } from '@/app/test/(data)/Providers';
 
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <Providers>
      <main className="bg-primary-100 w-full min-h-screen">{children}</main>
      </Providers>
    </>
  )
}
