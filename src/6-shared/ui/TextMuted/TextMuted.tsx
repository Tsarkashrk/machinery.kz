import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
};

const TextMuted = ({ children, fontSize, color, fontWeight }: Props) => {
  return (
    <p
      className="text-muted"
      style={{ fontSize, color, fontWeight }}
    >
      {children}
    </p>
  );
};

export default TextMuted;
