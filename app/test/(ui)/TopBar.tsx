import { HomeIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function TopGroupBar({groupData}: {groupData:any}) {
    
    return (
        <div className="fixed w-full bg-primary-blue flex justify-between items-center text-grey-100 px-5 py-4">
        <Link href="/test/split/groups" className="h-6 w-6">
          <HomeIcon />
        </Link>
        <h1 className="text-lg">  {groupData ? groupData.name : 'no such Page'}</h1>
        <div className="h-6 w-6">
          <Cog8ToothIcon />
        </div>
      </div>
    )
}