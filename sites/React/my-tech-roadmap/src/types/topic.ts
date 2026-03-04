export type TopicStatus = 'todo' | 'in-progress' | 'done';
export type Category = 'TypeScript' | 'React' | 'Redux' | 'Optimization' | 'Testing'

export interface Topic {
  id: number;
  title: string;
  category: Category;
  status: TopicStatus;
}

