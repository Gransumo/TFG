import axios from 'axios';
import { getToken } from '../utils/token';

const USUARIOS = axios.create({
	baseURL: process.env.REACT_APP_USUARIOS_URL
});

const EVENTOS = axios.create({
	baseURL: process.env.REACT_APP_EVENTOS_URL
});

const NOTIFICACIONES = axios.create({
	baseURL: process.env.REACT_APP_NOTIFICACIONES_URL
});


const addAuthInterceptor = (service) => {
	service.interceptors.request.use(
		config => {
			const token = getToken();
			if (token) {
				config.headers['authorization'] = `Bearer ${token}`;
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	service.interceptors.response.use(
		response => response,
		error => {
			if (error.response && error.response.status === 401) {
				console.error('No autorizado, redireccionando al login...');
			}
			return Promise.reject(error);
		}
	);
};


const initInterceptors = () => {
	addAuthInterceptor(USUARIOS);
	addAuthInterceptor(EVENTOS);
	addAuthInterceptor(NOTIFICACIONES);
};

export { USUARIOS, EVENTOS, NOTIFICACIONES, initInterceptors };
