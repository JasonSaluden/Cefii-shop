// Contient les fonctions pour les appels API liés au chat (créer une conversation, envoyer un message, etc.)
import api from './axiosInstance';

export const createConversation = (userId) =>
    api.post('/conversations', { userId }).then(res => res.data);

export const sendMessage = (conversationId, content) =>
    api.post(`/chat/${conversationId}`, { content }).then(res => res.data);
