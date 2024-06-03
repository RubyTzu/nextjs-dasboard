import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import ShareButton from './ShareButton';
import CopyLinkButton from './CopyLinkButton';
import { loginUserId } from '@/app/test/(data)/user';

export default function BalanceAndShareButtons({ groupData }: { groupData: any }) {
    if(!groupData) return

    const { id, name, membersIds }: {
        id: string;
        name: string;
        membersIds: string[];
    } = groupData

    return (
        <>
            {groupData && membersIds.includes(loginUserId) ?
                <div className="flex justify-center items-center gap-2 pt-6 pb-2">
                    <div className="flex justify-between items-center bg-primary-lightPink px-5 py-2 rounded-full text-sm">
                        <CurrencyDollarIcon className="flex justify-center items-center w-5 h-5" />
                        <p className="font-semibold ml-1">結餘</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShareButton id={id} name={name} inGroupPage={true} />
                        <CopyLinkButton id={id} name={name} inGroupPage={true} />
                    </div>
                </div>
                : null}
        </>
    )
}