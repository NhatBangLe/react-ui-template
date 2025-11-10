type ErrorCode =
	| 'unknown_error'
	| 'network_error'
	| 'parse_error'
	| 'request_timeout'
	| 'bad_request';

declare interface APIError {
	status: number;
	code: ErrorCode;
	message?: string;
}
