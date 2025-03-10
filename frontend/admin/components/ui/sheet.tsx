import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import { cn } from '~/lib/utils';
import { sheetVariants, SheetVariants } from '@/admin/lib/variants';

const Sheet = ({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) => {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

const SheetTrigger = ({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) => {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

const SheetClose = ({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) => {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

const SheetPortal = ({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

const SheetOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) => {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
				className,
			)}
			{...props}
		/>
	);
};

const SheetContent = ({
	className,
	children,
	variant = 'form',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & SheetVariants) => {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(sheetVariants({ variant }), className)}
				{...props}
			>
				{children}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
};

const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1.5 p-4', className)}
			{...props}
		/>
	);
};

const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			{...props}
		/>
	);
};

const SheetTitle = ({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) => {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn('font-semibold text-foreground', className)}
			{...props}
		/>
	);
};

const SheetDescription = ({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) => {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
};

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
