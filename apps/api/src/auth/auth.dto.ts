import { User } from '@prisma/client';

export interface RegisterRequestDto extends User {
  password: string;
}

export type AccessToken = {
  token: string;
};
