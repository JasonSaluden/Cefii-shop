// Contient la configuration de base pour les appels API avec Axios, notamment l'URL de base et les en-têtes par défaut.
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

export default api;
