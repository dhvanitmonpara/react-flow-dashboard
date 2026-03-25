import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const askAI = async (prompt) => {
  try {
    const response = await api.post('/ask-ai', { prompt });
    return response.data;
  } catch (error) {
    console.error('API Error (askAI):', error);
    throw error.response?.data || error.message;
  }
};

export const saveFlow = async (prompt, response) => {
  try {
    const res = await api.post('/save', { prompt, response });
    return res.data;
  } catch (error) {
    console.error('API Error (saveFlow):', error);
    throw error.response?.data || error.message;
  }
};
