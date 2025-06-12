import Cookies from 'js-cookie';

export enum EnumTokens {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string, refreshToken: string) => {
  const isLocalhost = window.location.hostname === 'localhost';

  const domain = isLocalhost ? undefined : '.mchnry.kz';

  const cookieOptions = {
    sameSite: 'lax' as const,
    expires: 1,
    secure: !isLocalhost,
    ...(domain && { domain }),
  };

  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, cookieOptions);
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, cookieOptions);
};

export const removeFromStorage = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const domain = isLocalhost ? undefined : '.mchnry.kz';

  const cookieOptions = {
    ...(domain && { domain }),
    secure: !isLocalhost,
  };

  Cookies.remove(EnumTokens.ACCESS_TOKEN, cookieOptions);
  Cookies.remove(EnumTokens.REFRESH_TOKEN, cookieOptions);
};
