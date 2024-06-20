//import from next
import Image from "next/image";
//import ui
import foodIcon from "@/app/test/(ui)/icons/food.svg";
import drinkIcon from "@/app/test/(ui)/icons/drink.svg";
import transportIcon from "@/app/test/(ui)/icons/transport.svg";
import stayIcon from "@/app/test/(ui)/icons/stay.svg";
import shoppingIcon from "@/app/test/(ui)/icons/shopping.svg";
import entertainmentIcon from "@/app/test/(ui)/icons/entertainment.svg";
import otherIcon from "@/app/test/(ui)/icons/other.svg";
import checkIcon from "@/app/test/(ui)/icons/check.svg";
import closeIcon from "@/app/test/(ui)/icons/close.svg";
import addGroupIcon from '@/app/test/(ui)/icons/addGroup.svg';
import addUserIcon from '@/app/test/(ui)/icons/addUser.svg';
import trashcanIcon from '@/app/test/(ui)/icons/trashcan.svg';
import dollarIcon from '@/app/test/(ui)/icons/dollar.svg';
import notePencilIcon from '@/app/test/(ui)/icons/notePencil.svg';

function FoodIcon() {
    return (
        <Image className="w-4" src={foodIcon} alt="" />
    )
}

function DrinkIcon() {
    return (
        <Image className="w-5" src={drinkIcon} alt="" />
    )
}

function TransportIcon() {
    return (
        <Image className="w-5" src={transportIcon} alt="" />
    )
}

function StayIcon() {
    return (
        <Image className="w-5" src={stayIcon} alt="" />
    )
}

function ShoppingIcon() {
    return (
        <Image className="w-5" src={shoppingIcon} alt="" />
    )
}

function EntertainmentIcon() {
    return (
        <Image className="w-5" src={entertainmentIcon} alt="" />
    )
}

function OtherIcon() {
    return (
        <Image className="w-5" src={otherIcon} alt="" />
    )
}

function CheckIcon() {
    return (
        <Image src={checkIcon} alt="" />
    )
}


function AddGroupIcon() {
  return <Image src={addGroupIcon} alt="" />;
}

function AddUserIcon() {
  return <Image src={addUserIcon} alt="" />;
}

function TrashcanIcon() {
  return <Image src={trashcanIcon} alt="" />;
}

function DollarIcon() {
  return <Image src={dollarIcon} alt="" />;
}

function NotePencilIcon() {
  return <Image src={notePencilIcon} alt="" />;
}

function CloseIcon() {
    return <Image src={closeIcon} alt="" />;
}

const expenseIconMap = {
    food: FoodIcon,
    drink: DrinkIcon,
    transport: TransportIcon,
    stay: StayIcon,
    shopping: ShoppingIcon,
    entertainment: EntertainmentIcon,
    other: OtherIcon,
};

const groupIconMap = {
    travel: "https://cdn2.thecatapi.com/images/av8.jpg",
    health: "https://cdn2.thecatapi.com/images/8mu.jpg",
    games: "https://images.dog.ceo/breeds/terrier-wheaten/n02098105_2472.jpg",
    other: "https://cdn2.thecatapi.com/images/ckq.jpg",
};

export { expenseIconMap, groupIconMap, CheckIcon, CloseIcon, AddGroupIcon, AddUserIcon, TrashcanIcon, DollarIcon, NotePencilIcon };