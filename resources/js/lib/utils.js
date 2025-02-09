import clsx from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

const cn = (...classes) => twMerge(clsx(classes));

const formatDate = (date = new Date(), f) => format(new Date(date), f);

// create an image reader function and return the new url
const previewImage = (event, { state, index = 0 }) => {
	const file = event?.target?.files[index] ?? event[index];
	const reader = new FileReader();

	reader.onload = (e) => {
		state.value = e.target.result;
	};

	if (file) {
		reader.readAsDataURL(file);
	}
};

const imageUrl = (file) => URL.createObjectURL(file);
const imageSize = (bytes) => {
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 B';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export { cn, formatDate, imageSize, imageUrl, previewImage };
