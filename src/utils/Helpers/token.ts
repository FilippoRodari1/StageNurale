import { Role } from './user.ts';

export interface TokenDecoded {
  tenantId: string;
  role: Role;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: true;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}
