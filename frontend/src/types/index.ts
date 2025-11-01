export interface User {
  _id: string;
  username: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  recipient: string;
  content: string;
  author: string;
  liked: boolean;
  createdAt: string;
}

export interface CreateUserResponse {
  success: boolean;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  redirectUrl: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: Message;
}

export interface GetMessagesResponse {
  success: boolean;
  messages: Message[];
}