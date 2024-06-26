import BackButton from '@/app/test/(ui)/BackButton';
import DoubleLineButton from '@/app/test/(ui)/DoubleLineButton';

export default function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[100] flex h-16 w-full items-center justify-between bg-white px-6 drop-shadow-sm">
      <BackButton />
      <DoubleLineButton />
    </div>
  );
}