
const TOKEN_KEY = 'GETOGETHER_TOKEN';

export function setToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
	localStorage.removeItem(TOKEN_KEY);
}

/* export function initInterceptors() {
	// Add a request interceptor
	axios.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			const token = getToken();
			if (token) {
				config.headers['authorization'] = `Bearer ${token}`;
			}
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	axios.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			if (error.response && error.response.status === 401) {
				deleteToken();
				window.location = '/';
			}
			return Promise.reject(error);
		}
	);
} */
