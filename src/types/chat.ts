export interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}