import { User } from '../auth/user';
import { Project } from '../project/Project';

export interface Participation {
  id?: number;
  user: User | string;
  project: Project | string;
  role: string;
}
