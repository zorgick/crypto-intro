import axios from 'axios';

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (config) => config,
  (error) => {
    const httpError = {
      status: error.response.status,
      message: error.response.message,
    };

    return Promise.reject(httpError);
  },
);
