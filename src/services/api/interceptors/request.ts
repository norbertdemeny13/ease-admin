/* eslint-disable */
import { AxiosRequestConfig } from 'axios';
import { store } from '@/store';

/* eslint-disable-next-line import/no-default-export */
export default (request: AxiosRequestConfig) => {
  /* eslint-disable no-param-reassign */
  request.baseURL = 'https://ease-be.herokuapp.com/api/v1';
  const authToken = localStorage.getItem('auth') && localStorage.getItem('auth')!.slice(2);
  const adminAuthToken = localStorage.getItem('adminAuth') && localStorage.getItem('adminAuth')!.slice(2);
  const userType = localStorage.getItem('userType');
  const atoken = userType === 'admin' ? adminAuthToken : authToken;
  const token = store.getters['session/getToken'] || atoken;

  if (token) {
    request.headers = {
      // accept: request.headers?.accept,
      // 'content-type': request.headers?.['content-type'],
      // 'access-control-allow-origin': '*',
      Authorization: `Bearer ${token}`,
    };
  }

  if ((request as any).contentType) {
    request.headers = {
      ...request.headers,
      'Content-Type': (request as any).contentType,
    };
  }

  /* eslint-enable no-param-reassign */
  return request;
};
