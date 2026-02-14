import api from './api';
import * as SecureStore from 'expo-secure-store';
import { CreateUserPrams, SignInParams, User } from '@/type';

export const login = async ({ email, password }: SignInParams): Promise<User> => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    if (token) {
        await SecureStore.setItemAsync('authToken', token);
    }

    return user;
};

export const register = async ({ email, password, name }: CreateUserPrams): Promise<User> => {
    const response = await api.post('/auth/register', { email, password, name });
    const { token, user } = response.data;

    if (token) {
        await SecureStore.setItemAsync('authToken', token);
    }

    return user;
};

export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        // fail silently
    } finally {
        await SecureStore.deleteItemAsync('authToken');
    }
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        return null;
    }
}
