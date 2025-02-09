import { toast } from 'vue-sonner';

const defaultToast = (message, options) => toast(message, options);

const errorToast = (message) =>
	toast.error('Error', {
		unstyled: true,
		duration: 100000,
		class: 'toast-error',
		description: message,
	});

const promiseToast = (promise, options) => {
	const { loading = 'Loading...', description, duration } = options || {};
	toast.promise(promise, {
		loading,
		success: 'Success!',
		error: 'Error!',
		description,
		class: 'toast-promise',
		duration,
	});
};

export { defaultToast, errorToast, promiseToast };
