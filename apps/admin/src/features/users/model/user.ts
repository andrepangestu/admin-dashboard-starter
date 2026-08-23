import type { EntityId } from '@starter/types';

export type UserStatus = 'active' | 'invited' | 'suspended';

export interface User {
  id: EntityId;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
}
