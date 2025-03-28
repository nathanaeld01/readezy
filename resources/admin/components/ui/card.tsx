import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn(
			'flex flex-col gap-4 border border-border bg-card p-4 text-card-foreground shadow-sm',
			className,
		)}
		data-slot="card"
		{...props}
	/>
);

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn('flex gap-1.5 border-b border-border pb-4', className)}
		data-slot="card-header"
		{...props}
	/>
);

const CardTitle = ({ className, ...props }: React.ComponentProps<'h3'>) => (
	<h3
		className={cn('leading-none font-normal text-muted-foreground', className)}
		data-slot="card-title"
		{...props}
	/>
);

const CardDescription = ({ className, ...props }: React.ComponentProps<'p'>) => (
	<p
		className={cn('text-sm text-muted-foreground', className)}
		data-slot="card-description"
		{...props}
	/>
);

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div className={className} data-slot="card-content" {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div className={cn('flex items-center px-6', className)} data-slot="card-footer" {...props} />
);

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
