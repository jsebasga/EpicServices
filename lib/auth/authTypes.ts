export type AppRole = 'client' | 'technician' | 'admin';

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: AppRole;
  status: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
};