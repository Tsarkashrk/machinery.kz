import { ReactNode } from 'react';
import { Title } from '../Title/Title';

type Props = {
  children?: ReactNode;
  className?: string;
  text?: string;
};

export const EmptyCard = ({ children, className, text }: Props) => {
  return (
    <div className="empty-card">
      <div className={`empty-card__wrapper ${className}`}>
        {children}
        <Title size="h2">{text}</Title>
      </div>
    </div>
  );
};
