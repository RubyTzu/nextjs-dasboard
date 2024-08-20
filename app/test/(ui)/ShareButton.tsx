'use client';
//import from next & react
import { useEffect, useRef } from 'react';
//import ui
import { ShareLinkIcon } from '@/app/test/(ui)/Icons';

export default function ShareButton({
  id,
  name,
  inGroupPage,
}: {
  id: string;
  name: string;
  inGroupPage: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const base = 'http://localhost:3001/test/split/group/';
  const links = base + id;


  useEffect(() => {
    const btn = btnRef.current;

    const shareData = {
      url: links, // 要分享的 URL
      title: name, // 要分享的標題
      text: `分享群組 - ${name}` // 要分享的文字內容
    };

    const handleClick = async () => {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error) {
          console.log("發生錯誤", err);
        } else {
          console.log("發生錯誤", err);
        }
      }
    };

    if (btn) {
      btn.addEventListener("click", handleClick);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const handlesShareLink = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {inGroupPage ? (
        <button
          ref={btnRef}
          onClick={(e) => handlesShareLink(e)}
          className="scale-[1.17] mr-2 flex items-center justify-center rounded-full bg-neutrals-20 p-2"
        >
          <ShareLinkIcon />
        </button>
      ) : (
        <button
          ref={btnRef}
          onClick={(e) => handlesShareLink(e)}
          className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60"
        >
          <ShareLinkIcon />
        </button>
      )}
    </>
  );
}
