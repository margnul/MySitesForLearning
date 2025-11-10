export default interface Message {
  id: number;
  author: string;
  text: string;
  date: string;
}

export type MessagesStatus = 'idle' | 'loading' | 'succeeded' | 'failed'