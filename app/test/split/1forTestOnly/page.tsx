'use client';
//import from next & react
import Image from 'next/image';
//import ui
import ShareButton from '@/app/test/(ui)/ShareButton';
import { FadeIn } from '../../(ui)/FadeIn';

export default function Page() {
  const userData = {
    id: 'u8',
    lineId: 'linIdu8',
    name: 'h',
    picture:
      'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
    groups: [
      {
        id: 'g5',
        name: '新年新希望123',
        picture: '/images/icons/groupIcon05.svg',
        users: [
          {
            id: 'u1',
            name: '小陳aaaaaaaaaaaa',
            picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
            adoptable: false,
          },
          {
            id: 'u2',
            name: '小明bbbbb',
            picture:
              'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
            adoptable: false,
          },
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u4',
            name: 'd',
            picture:
              'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
            adoptable: false,
          },
          {
            id: 'u5',
            name: 'e',
            picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
            adoptable: false,
          },
          {
            id: 'u6',
            name: 'f',
            picture:
              'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
            adoptable: false,
          },
          {
            id: 'u7',
            name: 'g',
            picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'u9',
            name: 'i',
            picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
            adoptable: false,
          },
          {
            id: 'u10',
            name: 'j',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: false,
          },
        ],
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: '/images/icons/groupIcon08.svg',
        users: [
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u4',
            name: 'd',
            picture:
              'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
            adoptable: false,
          },
          {
            id: 'u6',
            name: 'f',
            picture:
              'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'utest',
            name: 'test',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: true,
          },
        ],
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: '/images/icons/groupIcon11.svg',
        users: [
          {
            id: 'u1',
            name: '小陳aaaaaaaaaaaa',
            picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
            adoptable: false,
          },
          {
            id: 'u3',
            name: '小美的名字c',
            picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
            adoptable: false,
          },
          {
            id: 'u5',
            name: 'e',
            picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
            adoptable: false,
          },
          {
            id: 'u7',
            name: 'g',
            picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
            adoptable: false,
          },
          {
            id: 'u8',
            name: 'h',
            picture:
              'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
            adoptable: false,
          },
          {
            id: 'u9',
            name: 'i',
            picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
            adoptable: false,
          },
          {
            id: 'u10',
            name: 'j',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: false,
          },
          {
            id: 'utest',
            name: 'test',
            picture:
              'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
            adoptable: true,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <div className="mt-[6.5rem]">
        <FadeIn direction='right'>
          {userData.groups.map((group) => (
            <div
              key={group.id}
              className="mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2"
            >
              <div className="z-0 flex items-center">
                <Image
                  src={group.picture}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
                  width={200}
                  height={200}
                  alt={group.picture}
                  priority
                />
                <div className="w-52 truncate pl-3 font-normal">{group.name}</div>
              </div>
              <div className="flex items-center">
                <ShareButton
                  id={group.id || ''}
                  name={group.name}
                  inGroupPage={false}
                  groupUsers={group.users}
                />
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
      <div className="mb-16"></div>
    </div>
  );
}