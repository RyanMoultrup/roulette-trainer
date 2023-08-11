import axios from "axios"
import { readToken } from "@/lib/storage/auth/TokenStorage";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({ baseURL: `${baseUrl}/api/v1` })
const authApi = axios.create({ baseURL: baseUrl })

api.interceptors.request.use(
    config => {
        const token = readToken();
        if (token) config.headers['Authorization'] = token
        return config
    },
    error => {
        return Promise.reject(error);
    }
);

const CreateBaseApiService = (resource) => {
    return {
        list: (config) => api.get(`/${resource}`, config),
        get: (id, config) => api.get(`/${resource}/${id}`, config),
        create: (payload) => api.post(`/${resource}`, payload),
        update: (id, payload) => api.put(`/${resource}/${id}`, payload),
        patch: (id, payload) => api.patch(`/${resource}/${id}`, payload),
        remove: (id) => api.delete(`/${resource}/${id}`),
    }
}

export const user = {
    ...CreateBaseApiService('users'),
    custom: fn => fn(axios)
}

export const auth = {
    register: payload => authApi.post('/register', payload),
    login: payload => authApi.post('/authenticate', payload)
}

export default { user, auth }
