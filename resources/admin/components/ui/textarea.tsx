import * as React from 'react';

import { cn } from '@/admin/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			className={cn(
				'flex field-sizing-content min-h-30 w-full border border-border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40',
				className,
			)}
			data-slot="textarea"
			{...props}
		/>
	);
}

export { Textarea };
