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

export { cn, formatDate, previewImage };
