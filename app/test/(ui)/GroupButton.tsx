import CopyLinkButton from "./CopyLinkButton";
import ShareButton from "./ShareButton";

import {
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  travel: GlobeAsiaAustraliaIcon,
  health: HeartIcon,
  games: PuzzlePieceIcon,
  other: RocketLaunchIcon,
};

export default function GroupButton({ groupId, groupType, name }: {
  groupId: string;
  groupType: 'travel' | 'health' | 'games' | 'other';
  name: string;
}) {
  const Icon = iconMap[groupType];

  return (
    <div className="m-4 flex justify-between rounded-lg bg-grey-100 p-3">
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-200">
          {Icon ? <Icon className="h-6 w-6 text-grey-300" /> : null}
        </div>
        <p className="pl-2">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareButton groupId={groupId} name={name} />
        <CopyLinkButton groupId={groupId} name={name} />
      </div>
    </div>
  );
}