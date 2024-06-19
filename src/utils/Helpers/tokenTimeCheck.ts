import { jwtDecode } from 'jwt-decode';
import { TokenDecoded } from './token';

export const isTokenExpired = async (
  token: string | null | undefined,
): Promise<boolean> => {
  if (token) {
    try {
      const decoded: TokenDecoded = await jwtDecode(token);

      if (decoded) {
        const { exp } = decoded;
        const currentDate = new Date();
        const milliseconds = currentDate.getTime();
        const margins = 2 * 60 * 1000; // 5 minutes
        const threshold = (milliseconds + margins) / 1000;
        return exp < threshold;
      }
    } catch (error: any) {
      return true;
    }
  }
  return true;
};
