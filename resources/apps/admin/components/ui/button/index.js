import { cva } from 'class-variance-authority';

export { default as Button } from './button.vue';

export const buttonVariants = cva('btn', {
	variants: {
		variant: {
			primary: 'btn-primary',
			secondary: 'btn-secondary',
			tertiary: 'btn-tertiary',
			ghost: 'btn-ghost',
			danger: 'btn-danger',
		},
		size: {
			sm: 'btn-small',
			lg: 'btn-large',
		},
		icon: {
			true: 'btn-icon',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});
