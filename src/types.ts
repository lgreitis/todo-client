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
  ownerUserId: string;
  ownerUser: { username: string };
  _count: { files: number; users: number };
}

export interface Invite {
  id: string;
  disabled: boolean;
  dateCreated: string;
  expirationDate: string;
  organization: { name: string };
}

export interface InviteExtended extends Invite {
  _count: { usersInvited: number };
}
