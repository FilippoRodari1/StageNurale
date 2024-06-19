import { queryString } from './strings';
import { MultipartUrl, ParamsUrl } from './types';
import  {checkTokenValidity}  from './checkTokenValidity';

export interface FetchWrapper {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'MULTIPART';
  body?: any;
}

export interface FetchResponse<T> {
  status: number;
  statusText: string;
  ok: boolean;
  type: string;
  url: string;
  data?: T;
  errors?: Array<{ message: string }>;
}

const fetchWrapper = async ({ url, method, body }: FetchWrapper) => {
  const token = await checkTokenValidity();

  const headers = new Headers();
  if (method !== 'MULTIPART') {
    headers.set('content-type', 'application/json;charset=UTF-8');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const options: RequestInit = {
    method: method === 'MULTIPART' ? 'POST' : method,
    headers,
  };

  if (body) {
    options.body = method === 'MULTIPART' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return {
      status: responseJson?.data?.status || response.status,
      statusText: response.statusText,
      ok: response.ok,
      type: response.type,
      url: response.url,
      data: responseJson,
    };
  } catch (error) {
    throw error;
  }
};

const fetchCall = async <T>({
  url,
  params,
}: ParamsUrl): Promise<FetchResponse<T>> => {
  const query = decodeURI(queryString(params));
  return fetchWrapper({ url: `${url}${query || ''}`, method: 'GET' });
};

const postCall = async <T>({
  url,
  params,
}: ParamsUrl): Promise<FetchResponse<T>> =>
  await fetchWrapper({ url, body: params, method: 'POST' });

const patchCall = async <T>({
  url,
  params,
}: ParamsUrl): Promise<FetchResponse<T>> =>
  fetchWrapper({ url, body: params, method: 'PATCH' });

const putCall = async <T>({
  url,
  params,
}: ParamsUrl): Promise<FetchResponse<T>> =>
  fetchWrapper({ url, body: params, method: 'PUT' });

const deleteCall = async <T>({ url }: ParamsUrl): Promise<FetchResponse<T>> =>
  fetchWrapper({ url, method: 'DELETE' });

const multipartCall = async ({ url, formData }: MultipartUrl) =>
  fetchWrapper({ url, body: formData, method: 'MULTIPART' });

export class apiClient {
  static get = fetchCall;
  static post = postCall;
  static patch = patchCall;
  static put = putCall;
  static delete = deleteCall;
  static multipart = multipartCall;
}
