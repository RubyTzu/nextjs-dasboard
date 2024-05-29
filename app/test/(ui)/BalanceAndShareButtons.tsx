import {
    CurrencyDollarIcon,
    ArrowUpTrayIcon,
    LinkIcon
} from '@heroicons/react/24/outline';
import ShareButton from './ShareButton';
import CopyLinkButton from './CopyLinkButton';

export default function BalanceAndShareButtons({ groupData }: { groupData: any }) {
    if(!groupData) return

    const { groupId, name }: {
        groupId: string;
        name: string;
    } = groupData

    return (
        <>
            {groupData ?
                <div className="flex justify-center items-center gap-2 pt-6 pb-2">
                    <div className="flex justify-between items-center bg-primary-lightPink px-5 py-2 rounded-full text-sm">
                        <CurrencyDollarIcon className="flex justify-center items-center w-5 h-5" />
                        <p className="font-semibold ml-1">結餘</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShareButton groupId={groupId} name={name} inGroupPage={true} />
                        <CopyLinkButton groupId={groupId} name={name} inGroupPage={true} />
                    </div>
                </div>
                : null}
        </>
    )
}