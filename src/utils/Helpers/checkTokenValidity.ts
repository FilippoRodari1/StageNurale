
import {
  addTokenCookies,
  getTokenCookies,
  isTokenExpired,
  removeTokenCookies,
} from '.';

import { URL_REFRESH, V1, AUTH, BASE, API, ACCESS_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';
import { TokenDecoded } from './token';
import Cookies from 'js-cookie';

interface ReturnFunction {
  token: string;
  refresh: string;
}

const fetchRefreshToken = async (
  refreshToken: string,
): Promise<ReturnFunction | null> => {
  const headers = new Headers();

  headers.set('content-type', 'application/json;charset=UTF-8');

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ token: refreshToken }),
  };

  try {
    const response = await fetch(
      `${BASE}${API}${V1}${AUTH}${URL_REFRESH}`,
      options,
    );
    if (response.ok) {
      const responseJson = await response.json();
      const { access_token, refresh_token } = responseJson;
      return { token: access_token, refresh: refresh_token };
    }
    return null;
  } catch (error: any) {
    return null;
  }
};

export async function checkTokenValidity(): Promise<string | null | undefined> {
  const { token, refreshToken } = await getTokenCookies();
  const isExpired = await isTokenExpired(token);
  if (!isExpired) {
    return token;
  }
  if (token && refreshToken) {
    try {
      const result = await fetchRefreshToken(refreshToken);
      const { token, refresh } = result ?? {};
      if (token && refresh) {
        await addTokenCookies({ token: token, refreshToken: refresh });
        return token;
      }
      await removeTokenCookies();
      return null;
    } catch (error: any) {
      await removeTokenCookies();
      return null;
    }
  }

  await removeTokenCookies();
  return null;
}

export const getUserSessionIdFromToken = async (): Promise<string | null> => {
  const token = Cookies.get(ACCESS_TOKEN) || null;
  if (token) {
    try {
      const decoded: TokenDecoded = await jwtDecode(token);

      if (decoded) {
        return decoded.user_id;
      }
    } catch (error: any) {
      return null;
    }
  }
  return null;
};
