import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: Props) => {
  return <span className="error-message">* {children}</span>;
};

export default ErrorMessage;
