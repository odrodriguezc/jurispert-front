import { Project } from '../project/Project';

export interface Task {
  id?: number | string;
  title: string;
  description: string;
  createdAt?: string;
  deadline: string;
  project?: Project | string | number;
  completed: boolean;
}
