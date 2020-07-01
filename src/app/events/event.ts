import { Project } from '../project/Project';

export interface Event {
  id?: number;
  title: string;
  description: string;
  date: string;
  address: string;
  project: Project;
}
