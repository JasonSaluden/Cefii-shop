import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

// Mock all API modules
vi.mock('./api/productApi', () => ({
    getProducts: vi.fn(() => Promise.resolve({ data: [] })),
    getProductById: vi.fn(() => Promise.resolve({ data: {} })),
}));

vi.mock('./api/categoryApi', () => ({
    getCategories: vi.fn(() => Promise.resolve({ data: [] })),
}));

vi.mock('./api/authApi', () => ({
    login: vi.fn(),
    register: vi.fn(),
}));

vi.mock('./api/chatApi', () => ({
    sendMessage: vi.fn(() => Promise.resolve({ data: {} })),
}));

vi.mock('./api/orderApi', () => ({
    getOrders: vi.fn(() => Promise.resolve({ data: [] })),
}));

vi.mock('./api/userApi', () => ({
    getUser: vi.fn(() => Promise.resolve({ data: {} })),
}));

describe('App Component', () => {
    it('should render without crashing', () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });
});
