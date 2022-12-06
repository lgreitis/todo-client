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

export interface ValueLabel {
  value: string;
  label: string;
}

export interface Organization {
  id: string;
  name: string;
  ownerUser: { username: string };
  _count: { files: number; users: number };
}
