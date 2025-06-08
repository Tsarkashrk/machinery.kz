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

  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    ...(isLocalhost ? {} : { domain: 'machinery-kz.vercel.app' }),
    sameSite: 'strict',
    expires: 1,
  });
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    ...(isLocalhost ? {} : { domain: 'machinery-kz.vercel.app' }),
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
  Cookies.remove(EnumTokens.REFRESH_TOKEN);
};
