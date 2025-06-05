import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type:
    | "dark"
    | "light"
    | "sale"
    | "rent"
    | "sell"
    | "success"
    | "error"
    | "warning";
};

export const Badge = ({ type, children }: Props) => {
  return <p className={`badge badge--${type}`}>{children}</p>;
};
