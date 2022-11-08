export interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  login: string;
}

export const parseJwt = (token: string): TokenPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

// const numberToDate = (num: number): Date => {
//   return new Date(num * 1000);
// };

export const isTokenExpired = (token: string): boolean => Date.now() >= parseJwt(token).exp * 1000;
