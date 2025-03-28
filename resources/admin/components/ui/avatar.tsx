import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const Avatar = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) => (
	<AvatarPrimitive.Root
		className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
		data-slot="avatar"
		{...props}
	/>
);

const AvatarImage = ({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => (
	<AvatarPrimitive.Image
		className={cn('aspect-square size-full', className)}
		data-slot="avatar-image"
		{...props}
	/>
);

const AvatarFallback = ({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => (
	<AvatarPrimitive.Fallback
		className={cn(
			'flex size-full items-center justify-center rounded-full bg-muted',
			className,
		)}
		data-slot="avatar-fallback"
		{...props}
	/>
);

export { Avatar, AvatarFallback, AvatarImage };
