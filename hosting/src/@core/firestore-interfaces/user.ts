export interface UserBase {
  name: string;
  email: string;
  phone: string;
}

export type UserRoles = 'admin' | 'agency';

export interface User extends UserBase {
  address: string;
  userId?: string;
  roles?: UserRoles[];
  imageUrl?: string;
  verifiedByAdmin?: boolean;
  rejectedByAdmin?: boolean;
  _recentNeededItems?: string[];
}

export interface UserStats {
  agencies?: number;
  pendingMembers?: number;
}
