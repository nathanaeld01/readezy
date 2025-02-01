import { cva } from 'class-variance-authority';

export { default as Button } from './button.vue';

export const buttonVariants = cva(
	'inline-flex h-9 cursor-pointer items-center justify-center gap-2.5 rounded-md px-3 py-1.5 text-sm leading-none font-medium transition-[background,color,border] duration-200 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-60',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary/80 disabled:hover:bg-primary',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary',
				tertiary:
					'border border-accent bg-muted text-muted-foreground hover:bg-muted/80 disabled:hover:bg-muted',
				ghost: 'bg-transparent text-foreground hover:bg-accent/80 disabled:hover:bg-transparent',
				danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 disabled:hover:bg-destructive',
			},
			size: {
				sm: 'h-8 px-2.5 py-1',
				lg: 'h-10 px-4 py-2.5',
			},
			icon: {
				true: 'w-9 p-0 text-lg',
			},
		},
		compoundVariants: [
			{
				size: 'sm',
				icon: 'true',
				class: 'w-8',
			},
			{
				size: 'lg',
				icon: 'true',
				class: 'w-10',
			},
		],
		defaultVariants: {
			variant: 'primary',
		},
	},
);
