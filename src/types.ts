export interface User {
  email: string;
  username: string;
  role: "USER" | "SUPERADMIN";
  id: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
