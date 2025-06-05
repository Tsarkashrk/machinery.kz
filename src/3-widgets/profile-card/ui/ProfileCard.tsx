"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/6-shared/ui/Buttons/Button";
import { Badge } from "@/6-shared/ui/Badge/Badge";
import { ProfileStats } from "@/5-entities/profile";
import Avatar from "@/6-shared/ui/Avatar/Avatar";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import { LogoutButton } from "@/6-shared/ui/Buttons/LogoutButton";
// import { FollowButton } from '@/4-features/follow'
// import { ContactButton } from '@/4-features/contact'

interface ProfileCardProps {
  user: {
    id: number;
    name: string;
    title: string;
    location: string;
    avatar?: string;
    isPro: boolean;
    stats: {
      equipment: number;
      deals: number;
      rating: number;
    };
  };
  isOwnProfile?: boolean;
}

export const ProfileCard = ({
  user,
  isOwnProfile = false,
}: ProfileCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleContact = () => {
    console.log("Contact user:", user.id);
  };

  return (
    <div className="profile-card">
      <div className="profile-card__content">
        <div className="profile-card__avatar-section">
          <Avatar
            size="profile"
            link={user.id.toString()}
            username={user.name[0]}
          />
          {/* <div className="profile-card__avatar">{user.avatar ? <Image src={user.avatar} alt={`${user.name} avatar`} width={120} height={120} className="profile-card__avatar-image" /> : <div className="profile-card__letter">{user.name[0]}</div>}</div> */}
        </div>

        <div className="profile-card__info">
          <div className="profile-card__header">
            <h1 className="profile-card__name">
              {user.name}
              {/* {user.isPro && <Badge type="light">PRO 4</Badge>} */}
            </h1>

            <p className="profile-card__title">{user.title}</p>
            {user.location && (
              <p className="profile-card__location">based in {user.location}</p>
            )}
          </div>

          <div className="profile-card__actions">
            {!isOwnProfile && (
              <>
                {/* <FollowButton
                  isFollowing={isFollowing}
                  onClick={handleFollow}
                  className="profile-card__follow-btn"
                />
                <ContactButton
                  onClick={handleContact}
                  className="profile-card__contact-btn"
                /> */}
              </>
            )}
          </div>
        </div>

        <div className="profile-card__stats">
          <ProfileStats
            equipment={user.stats.equipment}
            deals={user.stats.deals}
            rating={user.stats.rating}
          />
        </div>
      </div>
    </div>
  );
};
