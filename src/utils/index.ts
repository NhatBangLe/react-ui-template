export const mimeTypes: Readonly<Array<{ ext: string; mime: string }>> = [
	// Text
	{ ext: 'txt', mime: 'text/plain' },
	{ ext: 'html', mime: 'text/html' },
	// Documents
	{ ext: 'pdf', mime: 'application/pdf' },
	{ ext: 'doc', mime: 'application/msword' },
	{
		ext: 'docx',
		mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	},
	{ ext: 'xls', mime: 'application/vnd.ms-excel' },
	{
		ext: 'xlsx',
		mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	},
	// Archives
	{ ext: 'zip', mime: 'application/zip' },
];

export const getMimeType = (fileName: string) => {
	const DEFAULT_MIME_TYPE = 'application/octet-stream';
	const extension = fileName.split('.').pop()?.toLowerCase();
	if (!extension) return DEFAULT_MIME_TYPE;

	const mime = mimeTypes.find((type) => type.ext === extension)?.mime;
	return mime ? mime : DEFAULT_MIME_TYPE;
};

/**
 *
 * @param bytes number of bytes, 1MB = 1024 KB
 * @returns
 */
export function getFileSize(bytes: number) {
	if (bytes < 1024) return `${bytes} bytes`;
	else if (bytes >= 1024 && bytes < 1024 * 1024)
		return `${(bytes / 1024).toFixed(1)} KB`;
	else return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const fileToBase64: (blob: Blob) => Promise<string> = (blob: Blob) =>
	new Promise((resolve, reject) => {
		const ERROR_RESPONSE = {
			code: 'parse_error',
			message: `Cannot parse Blob to Base64`,
			status: 500,
		} as APIError;
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () => {
			const base64URLAsString = reader.result;
			if (typeof base64URLAsString == 'string') {
				const breakpoint = ';base64,';
				const startIdx =
					base64URLAsString.indexOf(breakpoint) + breakpoint.length;
				const base64AsString = base64URLAsString.substring(startIdx);
				resolve(base64AsString);
			} else reject(ERROR_RESPONSE);
		};
		reader.onerror = () => reject(ERROR_RESPONSE);
	});

export const triggerBrowserDownload = (fileName: string, blob: Blob) => {
	// Create a temporary URL for the blob
	const url = window.URL.createObjectURL(blob);

	// Create a temporary link element to trigger the download
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', fileName); // Set the default file name

	// Append link to the body, click it, and then remove it
	document.body.appendChild(link);
	link.click();
	link.parentNode?.removeChild(link);

	// Revoke the object URL to free up memory
	window.URL.revokeObjectURL(url);
};
