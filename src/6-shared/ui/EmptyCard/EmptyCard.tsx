import { ReactNode } from "react";
import { Title } from "../Title/Title";

type Props = {
  children: ReactNode;
};

export const EmptyCard = ({ children }: Props) => {
  return (
    <div className="empty-card">
      <div className="empty-card__wrapper">
        <Title size="h2">{children}</Title>
      </div>
    </div>
  );
};
