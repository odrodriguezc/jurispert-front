export interface User {
  id?: number | string;
  fullName?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmation?: string;
  roles?: string[];
}
