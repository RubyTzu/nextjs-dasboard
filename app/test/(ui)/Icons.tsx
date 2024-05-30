import Image from "next/image";
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

import {
    GlobeAsiaAustraliaIcon,
    HeartIcon,
    PuzzlePieceIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline';


function FoodIcon() {
    return (
        <Image src={foodIcon} alt="" />
    )
}

function DrinkIcon() {
    return (
        <Image src={drinkIcon} alt="" />
    )
}

function TransportIcon() {
    return (
        <Image src={transportIcon} alt="" />
    )
}

function StayIcon() {
    return (
        <Image src={stayIcon} alt="" />
    )
}

function ShoppingIcon() {
    return (
        <Image src={shoppingIcon} alt="" />
    )
}

function EntertainmentIcon() {
    return (
        <Image src={entertainmentIcon} alt="" />
    )
}

function OtherIcon() {
    return (
        <Image src={otherIcon} alt="" />
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
    travel: GlobeAsiaAustraliaIcon,
    health: HeartIcon,
    games: PuzzlePieceIcon,
    other: RocketLaunchIcon,
};

export { expenseIconMap, groupIconMap, CheckIcon, CloseIcon, AddGroupIcon };