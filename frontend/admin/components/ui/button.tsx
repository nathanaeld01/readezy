import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

type Props = React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const buttonVariants = cva(
	'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm leading-none font-medium whitespace-nowrap transition-[color,background] duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive icon-child:pointer-events-none',
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
				default: 'h-9 px-4.5 icon-child:text-lg',
				sm: 'h-8 px-4 icon-child:text-base',
				lg: 'h-10 px-5 icon-child:text-lg',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	...props
}: Props) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

export { Button, buttonVariants };
