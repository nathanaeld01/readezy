import { cva } from 'class-variance-authority';

export { default as SheetClose } from './sheet-close.vue';
export { default as SheetContent } from './sheet-content.vue';
export { default as SheetDescription } from './sheet-description.vue';
export { default as SheetFooter } from './sheet-footer.vue';
export { default as SheetHeader } from './sheet-header.vue';
export { default as SheetModal } from './sheet-modal.vue';
export { default as SheetTitle } from './sheet-title.vue';
export { default as SheetTrigger } from './sheet-trigger.vue';
export { default as Sheet } from './sheet.vue';

export const sheetVariants = cva(
	'fixed z-50 grid grid-rows-[auto_1fr_auto] rounded-md border border-border bg-popover shadow-lg duration-400 data-[state=closed]:animate-out data-[state=open]:animate-in',
	{
		variants: {
			side: {
				top: 'inset-x-2.5 top-2.5 w-[calc(100%-1.25rem)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
				bottom: 'inset-x-2.5 bottom-2.5 w-[calc(100%-1.25rem)] border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
				left: 'inset-y-2.5 left-2.5 h-[calc(100%-1.25rem)] w-full max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left md:max-w-100',
				right: 'inset-y-2.5 right-2.5 h-[calc(100%-1.25rem)] w-full max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right md:max-w-100',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	},
);
