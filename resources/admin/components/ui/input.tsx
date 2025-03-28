import * as React from 'react';

import { cn } from '@/admin/lib/utils';

export const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-9 w-full border border-border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	);
};
