import { User } from '../auth/user';

export interface Project {
  id?: number;
  title: string;
  shortDescription: string;
  description: string;
  createdAt?: string;
  deadline: string;
  adversary: string;
  stages: string[];
  customer?: any;
  status: string;
  tasks?: any;
  participations?: any;
  category: string;
  events?: any;
  owner?: User | string;
}
