"use client";

import {
  PLATFORM_PAGES,
  PROFILE_PAGES,
} from "@/6-shared/config/pages-url.config";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

interface ProfileButtonProps {
  email: string;
  username: string;
}

const ProfileButton = (data: ProfileButtonProps) => {
  return (
    <Link href={PROFILE_PAGES.PROFILE} className="profile-button">
      <Avatar link={PROFILE_PAGES.PROFILE} username={data.username} />
      <p className="profile-button__email">{data.email}</p>
    </Link>
  );
};

export default ProfileButton;
