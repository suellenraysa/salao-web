import jwt_decode from "jwt-decode";

export const TOKEN_KEY = "beauty-token";
export const USER_KEY = "beauty-user";

export const setToken = (token: string) => {
  const decoded = jwt_decode(token);

  localStorage.setItem(USER_KEY, JSON.stringify(decoded));
  localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : {};
}

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
};