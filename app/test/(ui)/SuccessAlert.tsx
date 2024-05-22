'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function SuccessAlert({
  text,
  name,
  isShow,
  setIsShow,
}: {
  text: string;
  name: string;
  isShow: boolean;
  setIsShow: Function;
}) {
  const router = useRouter();
  const handleClick = () => {
    setIsShow(false);
    router.refresh();
    console.log(name);
  };

  return (
    <div
      className={clsx('relative bottom-12 left-0 transition-all duration-200', {
        'z-50 transform opacity-100': isShow,
        'transform opacity-0': !isShow,
      })}
    >
      <div className="absolute right-0 top-[60%]">
        <div className="flex w-64 rounded-lg shadow-lg">
          <div className="flex items-center rounded-l-lg bg-primary-300 px-6 py-4">
            <button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-grey-300"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex w-full items-center justify-between rounded-r-lg border border-gray-200 border-l-transparent bg-white px-4 py-6">
            <div>
              {text}
              <br />
              {name}
            </div>
            <button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-grey-300"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
{/* 
      <div
        onClick={handleClick}
        className="absolute left-[0%] top-[0%] z-10 h-screen w-screen bg-[#0009]"
      ></div> */}
    </div>
  );
}