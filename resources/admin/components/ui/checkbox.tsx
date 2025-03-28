import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/admin/lib/utils';

const Checkbox = ({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
	return (
		<div className="flex items-center justify-center">
			<CheckboxPrimitive.Root
				data-slot="checkbox"
				className={cn(
					'peer size-4 shrink-0 cursor-pointer border border-input bg-input/10 shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary',
					className,
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					data-slot="checkbox-indicator"
					className="flex items-center justify-center text-current transition-none"
				>
					<i className="hgi hgi-stroke hgi-tick-02 text-base/none font-extrabold" />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		</div>
	);
};

export { Checkbox };
