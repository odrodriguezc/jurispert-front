import { Project } from '../project/Project';

export interface Task {
  id?: number;
  title: string;
  description: string;
  createdAt?: string;
  deadline: string;
  project?: Project;
  completed: boolean;
}
