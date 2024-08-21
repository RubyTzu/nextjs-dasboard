'use client';
import { useEffect,useState } from 'react';
//import data
import { Group } from '../../(data)/(sharedFunction)/types';
import Image from 'next/image';
import ShareButton from '../../(ui)/ShareButton';
//import ui

export default function Page() {
const userData = {
  "id": "u8",
  "lineId": "linIdu8",
  "name": "h",
  "picture": "https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg",
  "groups": [
    {
      "id": "g5",
      "name": "新年新希望123",
      "picture": "/images/icons/groupIcon05.svg"
    },
    {
      "id": "g8",
      "name": "group Games 2",
      "picture": "/images/icons/groupIcon08.svg"
    },
    {
      "id": "g11",
      "name": "group Other 3",
      "picture": "/images/icons/groupIcon11.svg"
    }
  ]
}

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
    <h1 className="pt-7 z-[2] fixed left-[50%] translate-x-[-50%] w-full bg-highlight-50 text-center text-2xl font-semibold tracking-wide text-white">
      群組列表
    </h1>
    <div className="mt-[6.5rem]">
      {userData
        ? userData.groups.map((group) => (
          <GroupButton key={group.id} groupData={group} />
        ))
        : null}
    </div>
    <div className="mb-16"></div>
  </div>
  );
}

function GroupButton({ groupData }: { groupData: any }) {
  const {
    id,
    picture,
    name,
  }= groupData;


  return (
    <div
      className="mx-6 my-4 flex justify-between rounded-[20px] bg-white py-2 px-3"
    >
      <div className="z-0 flex items-center">
        {picture ? (
          <Image
            src={picture}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
            width={200}
            height={200}
            alt={picture}
            priority
          />
        ) : null}
        <p className="pl-3 font-normal">{name}</p>
      </div>
      <div className="flex items-center">
        <ShareButton id={id || ""} name={name} inGroupPage={false} />
      </div>
    </div>
  );
}
