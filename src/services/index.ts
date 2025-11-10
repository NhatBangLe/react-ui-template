import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, {
	AxiosError,
	HttpStatusCode,
	isAxiosError,
	type AxiosRequestConfig,
} from 'axios';

export const API_DEFAULT_ERROR: APIError = {
	status: 500,
	code: 'unknown_error',
	message: 'An unknown error occurred',
};

export const convertAxiosError: (error: unknown) => APIError = (error) => {
	if (!isAxiosError(error)) return API_DEFAULT_ERROR;

	switch (error.code) {
		case AxiosError.ERR_NETWORK:
			return {
				...API_DEFAULT_ERROR,
				code: 'network_error',
				message: 'A network error occurred',
			};
		case AxiosError.ETIMEDOUT:
			return {
				...API_DEFAULT_ERROR,
				code: 'request_timeout',
				message: 'Request timeout',
			};
		case AxiosError.ERR_BAD_REQUEST:
			return {
				status: HttpStatusCode.BadRequest,
				code: 'bad_request',
				message: error.response?.data.message,
			};
		default:
			return {
				status: error.status ?? API_DEFAULT_ERROR.status,
				code: error.response?.data?.code ?? API_DEFAULT_ERROR.code,
				message: error.response?.data?.message ?? API_DEFAULT_ERROR.message,
			};
	}
};

export interface AxiosBaseQueryParams {
	baseUrl: string;
	timeout?: number;
}

export const axiosBaseQuery =
	(
		{ baseUrl, timeout }: AxiosBaseQueryParams = {
			baseUrl: '',
		}
	): BaseQueryFn<
		{
			url: string;
			method?: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			headers?: AxiosRequestConfig['headers'];
		},
		unknown,
		APIError
	> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers,
				timeout,
			});
			return { data: result.data };
		} catch (axiosError) {
			return {
				error: convertAxiosError(axiosError),
			};
		}
	};
