import { Role } from "@/components/common/enum";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export const getTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const getUserFromToken = (): DecodedToken | null => {
  const token = getTokenFromCookie();
  return token ? decodeToken(token) : null;
};
