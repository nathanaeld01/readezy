import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const TooltipProvider = ({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => (
	<TooltipPrimitive.Provider
		data-slot="tooltip-provider"
		delayDuration={delayDuration}
		{...props}
	/>
);

const Tooltip = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => (
	<TooltipPrimitive.Root data-slot="tooltip" {...props} />
);

const TooltipTrigger = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => (
	<TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

const TooltipContent = ({
	children,
	className,
	sideOffset = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
	<TooltipPrimitive.Content
		className={cn(
			'z-50 w-fit rounded-md bg-primary px-3 py-1.5 text-xs text-balance text-primary animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
			className,
		)}
		data-slot="tooltip-content"
		sideOffset={sideOffset}
		{...props}
	>
		{children}
	</TooltipPrimitive.Content>
);

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
