import api from './axiosInstance';

export const createConversation = (userId) =>
    api.post('/conversations', { userId }).then(res => res.data);

export const sendMessage = (conversationId, content) =>
    api.post(`/chat/${conversationId}`, { content }).then(res => res.data);
