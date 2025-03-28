import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/admin/lib/utils';
import { Button } from './button';

const Dialog = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) => {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

const DialogTrigger = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

const DialogPortal = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) => {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

const DialogClose = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) => {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

const DialogOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
				className,
			)}
			{...props}
		/>
	);
};

const DialogContent = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) => {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				className={cn(
					'fixed inset-0 z-50 m-auto h-fit w-[90vw] max-w-xl divide-y divide-border border border-border bg-background text-primary data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
};

const DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div data-slot="dialog-header" className={cn('flex p-4 text-left', className)} {...props} />
	);
};

const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex flex-col-reverse p-4 sm:flex-row sm:justify-end sm:space-x-2',
				className,
			)}
			{...props}
		/>
	);
};

const DialogTitle = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => {
	return (
		<div className="flex items-center justify-between">
			<DialogPrimitive.Title
				className={cn(
					'inline-flex items-center gap-4 text-lg/none font-semibold tracking-tight',
					className,
				)}
				data-slot="dialog-title"
				{...props}
			/>
			<DialogClose asChild>
				<Button className="size-8" variant="ghost" size="icon">
					<i className="hgi hgi-stroke hgi-cancel-01 text-lg" />
				</Button>
			</DialogClose>
		</div>
	);
};

const DialogDescription = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div
			data-slot="dialog-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
};

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
