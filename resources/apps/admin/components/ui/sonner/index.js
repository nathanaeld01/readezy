import { defaultToast, errorToast, promiseToast } from './toast.js';

const toast = Object.assign(defaultToast, {
	error: errorToast,
	promise: promiseToast,
});

export { default as Toaster } from './sonner.vue';
export { toast };
