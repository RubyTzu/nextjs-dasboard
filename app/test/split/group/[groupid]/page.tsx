"use client"
import { useParams } from "next/navigation";
import { groups } from "@/app/test/(data)/data";
import { TopGroupBar } from "@/app/test/(ui)/TopBar";
import UsersBar from "@/app/test/(ui)/UsersBar";


export default function Page() {
  const params = useParams<{ groupid: string }>();
  const groupData = groups.filter((group) => group.groupId === params.groupid)[0];


  return (
    <div className="flex flex-col">
      <TopGroupBar groupData={groupData} />
      <UsersBar groupData={groupData} />
    </div >
  );
}