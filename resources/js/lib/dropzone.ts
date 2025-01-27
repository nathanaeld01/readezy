type FileInfo = {
	name: string;
	size: string;
	url: string;
};

const readableFilesize = (bytes: number): string => {
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 B';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const readableFileurl = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

const transformFile = async (file: File) => ({
	name: file.name,
	url: await readableFileurl(file),
	size: readableFilesize(file.size),
});

const parseAccept = (accept) => {
	if (accept === 'image/*') {
		return [
			'image/png',
			'image/jpeg',
			'image/gif',
			'image/bmp',
			'image/webp',
			'image/tiff',
			'image/x-icon',
			'image/svg+xml',
		];
	}
	return [accept];
};

const validateAccept = (value) => {
	// Allow wildcard MIME types like image/*, video/*, audio/*, application/*
	const pattern = /^(\*\/\*|(\.|application\/|image\/|video\/|audio\/|\w+\/\*)[a-z0-9+.-]*)$/;
	return pattern.test(value);
};

export { parseAccept, readableFilesize, readableFileurl, transformFile, validateAccept };
export type { FileInfo };
