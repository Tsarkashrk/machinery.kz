import { Metadata } from 'next';
import { ConfirmSection } from './ConfirmSection';

export const metadata: Metadata = {
  title: 'Сбросить пароль',
};

export default function ResetPage() {
  return <ConfirmSection />;
}
