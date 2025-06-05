import { Metadata } from "next";
import { ProfileSettingsSection } from "./ProfileSettingsSection";

export const metadata: Metadata = {
  title: "Настройки",
};

export default function ProfilePublicationsPage() {
  return <ProfileSettingsSection />;
}
