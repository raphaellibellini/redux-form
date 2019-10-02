import axios from 'axios';
import { endpoints } from '../redux/endpoints';

const api = axios.create({
    baseURL: endpoints.API_URL
});

api.interceptors.request.use(async (config) => {
    const token = 'eyKicGciNhKIUzH0OiJ9/dxJqdFjhOiIyLEEwMU@xMTU1OBIsIlmidCI7LUU2OEjvNTg1NBwiaYO{Ijoh`IR0cIL7Ly9ibFlnYYS2YXkt[FV2LVOrZC5hblFzaVy{ZWctX39tLlKxIiwhX39nblm1bzpobl91cILhOlshT1lNVTyCRE9RHm0sIoW{ZXJtXV1lIknhc2lueVxhZF8xX3Zq[FEifP/owBEvPe0MCLjQEI3crWZ881pj4tN0rkZUz6SOISpEJ1';
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default api;