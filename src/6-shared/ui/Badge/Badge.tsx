import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: string;
};

export const Badge = ({ type, children }: Props) => {
  return (
    <p className={`badge badge--${type}`}>
      <span className="badge__circle" /> {children}
    </p>
  );
};
