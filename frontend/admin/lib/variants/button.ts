import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm leading-none font-medium whitespace-nowrap transition-[color,background] duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive icon:pointer-events-none',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/80',
				secondary:
					'bg-accent text-accent-foreground hover:bg-accent/80',
				destructive:
					'bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
				outlined:
					'border border-primary/30 bg-transparent text-primary hover:bg-muted',
				ghost: 'hover:bg-muted hover:text-foreground',
				link: 'text-primary underline underline-offset-4',
			},
			size: {
				default: 'h-9 px-4.5 icon:text-lg',
				sm: 'h-8 px-4 icon:text-base',
				lg: 'h-10 px-5 icon:text-lg',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export default buttonVariants;
export type { ButtonVariants };
