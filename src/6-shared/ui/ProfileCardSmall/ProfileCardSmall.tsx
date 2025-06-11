import { MapPin, PinIcon, StarIcon } from 'lucide-react';
import Avatar from '../Avatar/Avatar';
import { Title } from '../Title/Title';
import { ICON_SIZE } from '@/6-shared/constants/constants';

type Props = {
  avatar?: string;
  link: string;
  lastName?: string;
  firstName?: string;
  trustScore?: number; // от 0 до 5, например
  location?: string;
  salesCount?: number;
  isVerified?: boolean;
  equipmentCount?: number;
  dealsCount?: number;
};

export const ProfileCardSmall = ({
  avatar,
  link,
  equipmentCount,
  firstName,
  lastName,
  trustScore = 0,
  dealsCount,
  location,
  salesCount,
  isVerified = false,
}: Props) => {
  const stars = Array.from({ length: trustScore }, (_, i) => (
    <StarIcon
      key={i}
      size={16}
      fill="orange"
      stroke="orange"
      className="profile-card-small__star"
    />
  ));

  return (
    <div className="profile-card-small">
      <div className="profile-card-small__header">
        <Avatar
          link={link}
          avatar={avatar}
        />
        <div className="profile-card-small__info">
          <Title
            size="h4"
            fontFamily="geist"
          >
            {firstName} {lastName}
          </Title>
          {stars && <div className="profile-card-small__rating">{stars}</div>}
        </div>
      </div>
      <div className="profile-card-small__items">
        {equipmentCount} публикаций | {dealsCount} сделок 
      </div>
      {location && (
        <p className="profile-card-small__location">
          <MapPin
            fill="true"
            size={ICON_SIZE}
          />{' '}
          {location}
        </p>
      )}

      <div className="profile-card-small__body">
        {typeof salesCount === 'number' && (
          <div className="profile-card-small__sales">
            <span className="label">Продаж:</span> {salesCount}
          </div>
        )}
      </div>
    </div>
  );
};
