import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot="card"
		className={cn(
			'flex flex-col gap-4 border border-border bg-card p-4 text-card-foreground shadow-sm',
			className,
		)}
		{...props}
	/>
);

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot="card-header"
		className={cn('flex gap-1.5 border-b border-border pb-4', className)}
		{...props}
	/>
);

const CardTitle = ({ className, ...props }: React.ComponentProps<'h3'>) => (
	<h3
		data-slot="card-title"
		className={cn('leading-none font-normal text-muted-foreground', className)}
		{...props}
	/>
);

const CardDescription = ({ className, ...props }: React.ComponentProps<'p'>) => (
	<p
		data-slot="card-description"
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
);

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div data-slot="card-content" className={className} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div data-slot="card-footer" className={cn('flex items-center px-6', className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
