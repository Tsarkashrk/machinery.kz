import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <span className="error-message">* {children}</span>;
};

export default ErrorMessage;
