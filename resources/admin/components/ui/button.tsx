import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/admin/lib/utils';
import { type ButtonVariants, buttonVariants } from '@/admin/lib/variants';

type Props = ButtonVariants &
	React.ComponentProps<'button'> & {
		asChild?: boolean;
	};

const Button = ({ asChild = false, className, size, variant, ...props }: Props) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			className={cn(buttonVariants({ className, size, variant }))}
			data-slot="button"
			{...props}
		/>
	);
};

export { Button };
export type { Props as ButtonProps };
