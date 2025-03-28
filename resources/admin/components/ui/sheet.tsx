import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { Button } from './button';
import { cn } from '@/admin/lib/utils';
import { sheetVariants, SheetVariants } from '@/admin/lib/variants';

const Sheet = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) => {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

const SheetTrigger = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) => {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

const SheetClose = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) => {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

const SheetPortal = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

const SheetOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) => {
	return (
		<SheetPrimitive.Overlay
			className={cn(
				'fixed inset-0 z-50 bg-background/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
				className,
			)}
			data-slot="sheet-overlay"
			{...props}
		/>
	);
};

const SheetModal = ({
	children,
	className,
	variant = 'form',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & SheetVariants) => {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				className={cn(sheetVariants({ variant }), className)}
				data-slot="sheet-content"
				{...props}
			>
				{children}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
};

const SheetHeader = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			className={cn('flex items-center justify-between', className)}
			data-slot="sheet-header"
			{...props}
		>
			{children}
			<SheetClose asChild>
				<Button className="my-2 mr-2 ml-auto" size="icon" variant="ghost">
					<i className="hgi hgi-stroke hgi-cancel-01" />
				</Button>
			</SheetClose>
		</div>
	);
};

const SheetContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('p-4', className)} {...props} />;
};

const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			data-slot="sheet-footer"
			{...props}
		/>
	);
};

const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => {
	return (
		<SheetPrimitive.Title
			className={cn('p-4 font-semibold text-foreground', className)}
			data-slot="sheet-title"
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
			className={cn('text-sm text-muted-foreground', className)}
			data-slot="sheet-description"
			{...props}
		/>
	);
};

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetModal,
	SheetTitle,
	SheetTrigger,
};
