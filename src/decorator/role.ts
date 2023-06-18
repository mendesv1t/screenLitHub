import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role_key';
export const Role = (profile: string) => SetMetadata(ROLE_KEY, profile);
