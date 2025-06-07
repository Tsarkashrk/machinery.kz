'use client';

import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLink?: boolean;
  isLoading?: boolean;
  width?: string;
  link?: string;
  text?: string;
  icon?: ReactNode;
  variant?:
    | 'light'
    | 'dark'
    | 'default'
    | 'outlined'
    | 'underlined'
    | 'secondary'
    | 'rounded'
    | 'danger'
    | 'success';
  textStart?: 'start' | 'middle' | 'end';
  children?: ReactNode;
  isActiveOverride?: boolean;
}

const Button = ({
  isLoading = false,
  width,
  textStart = 'middle',
  link = '',
  text,
  icon,
  variant = 'default',
  children,
  isActiveOverride,
  ...rest
}: IButton) => {
  const pathname = usePathname();
  const isActive = isActiveOverride ?? (link && pathname.startsWith(link));

  const baseClass = 'button';
  const variantClass = `${baseClass}--${variant}`;
  const activeClass = isActive ? `${variantClass}--active` : '';
  const isLoadingClass = isLoading ? `${baseClass}--loading` : '';

  const className =
    `${baseClass} ${variantClass} ${activeClass} ${isLoadingClass}`.trim();

  return link ? (
    <Link
      className={`${className} ${textStart && 'button--' + textStart}`}
      href={link}
      style={{ width }}
      {...(rest as any)}
    >
      {children}
    </Link>
  ) : (
    <button
      disabled={isLoading}
      className={`${className} ${textStart && 'button--' + textStart}`}
      style={{ width }}
      {...rest}
    >
      {children} {isLoading && <span className="spinner" />}
    </button>
  );
};

export default Button;
