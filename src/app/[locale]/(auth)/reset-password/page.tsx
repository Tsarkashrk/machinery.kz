import { Metadata } from 'next';
import { ResetPasswordSection } from './ResetSection';

export const metadata: Metadata = {
  title: 'Сбросить пароль',
};

export default function ResetPage() {
  return <ResetPasswordSection />;
}
