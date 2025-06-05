import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: string;
  fontSize?: string;
};

export const TitleDescription = ({ children, color, fontSize }: Props) => {
  return (
    <h3 className="title-description" style={{ color, fontSize }}>
      {children}
    </h3>
  );
};
