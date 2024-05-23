import Navbar from "../(ui)/Navbar";

 
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
    {/* <Navbar /> */}
      <main className="bg-primary-100 w-full min-h-screen">{children}</main>
    </>
  )
}
