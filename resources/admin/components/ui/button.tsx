import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/admin/lib/utils';
import { type ButtonVariants, buttonVariants } from '@/admin/lib/variants';

type Props = React.ComponentProps<'button'> &
	ButtonVariants & {
		asChild?: boolean;
	};

const Button = ({ className, variant, size, asChild = false, ...props }: Props) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

export { Button };
