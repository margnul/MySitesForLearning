export type TopicStatus = 'todo' | 'in-progress' | 'done';

export interface Topic {
  id: number;
  title: string;
  category: string;
  status: TopicStatus;
}