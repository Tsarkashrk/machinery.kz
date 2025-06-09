import React, { ReactNode, TextareaHTMLAttributes } from 'react';
interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
}

const Textarea = ({ children, ...rest }: ITextarea) => {
  return (
    <textarea
      className="textarea"
      {...rest}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
