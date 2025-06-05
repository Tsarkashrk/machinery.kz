import { ReactNode } from "react";
import Button from "../Buttons/Button";

type Props = {
  children: ReactNode;
  fontSize?: string;
  link?: string;
};

export const TitleMore = ({ children, fontSize, link }: Props) => {
  return (
    <div className="title-more" style={{ fontSize: fontSize }}>
      <Button link={link} variant="underlined">
        {children}
      </Button>
    </div>
  );
};
