import axios from 'axios';
import type { CreateUserResponse, SendMessageResponse, GetMessagesResponse, Message, LoginResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const login = async (username: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username });
  return response.data;
};

export const verifyUser = async (username: string): Promise<CreateUserResponse> => {
  const response = await api.get(`/auth/verify/${username}`);
  return response.data;
};

// User endpoints
export const createUser = async (username: string): Promise<CreateUserResponse> => {
  const response = await api.post('/users/create', { username });
  return response.data;
};

export const getUser = async (username: string): Promise<CreateUserResponse> => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

// Message endpoints
export const sendMessage = async (recipient: string, content: string): Promise<SendMessageResponse> => {
  const response = await api.post('/messages/create', { recipient, content });
  return response.data;
};

export const getMessages = async (username: string): Promise<GetMessagesResponse> => {
  const response = await api.get(`/messages/${username}`);
  return response.data;
};

export const toggleLikeMessage = async (messageId: string): Promise<{ success: boolean; message: Message }> => {
  const response = await api.patch(`/messages/${messageId}/like`);
  return response.data;
};

export default api;