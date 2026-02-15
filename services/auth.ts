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

export const sendVerification = async ({ email, password, name }: CreateUserPrams): Promise<void> => {
    await api.post('/sendVerification', { email, password, username: name });
};

export const verifyEmail = async (code: string): Promise<User> => {
    const response = await api.post('/verify', { verify: code });
    const { user } = response.data;
    // Note: The backend response structure in the user request shows { message, user }. 
    // It doesn't explicitly show a token return in verify, but usually auth flows return one.
    // Based on the user's backend code `req.login`, it establishes a session.
    // If the backend is session-based (cookies), we might not get a token. 
    // However, the previous code handled a token. I will assume for now we might need to rely on the cookie 
    // or if a token is returned, store it. The provided backend code DOES NOT return a token in /verify.
    // It returns: res.status(201).json({ message: "Welcome to TripLinker!", user: registeredUser });

    // If there is ANY token in the response, we should save it.
    if (response.data.token) {
        await SecureStore.setItemAsync('authToken', response.data.token);
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
