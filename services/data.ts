import api from './api';
import { GetMenuParams, MenuItem, Category } from '@/type';

export const getMenu = async ({ category, query }: GetMenuParams): Promise<MenuItem[]> => {
    const params: any = {};
    if (category) params.category = category;
    if (query) params.query = query;

    const response = await api.get('/menu', { params });
    // Assuming backend returns an array or { data: [...] }
    return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    // Assuming backend returns an array or { data: [...] }
    return response.data;
};
