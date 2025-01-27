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

export const sheetVariants = cva('sheet', {
	variants: {
		side: {
			top: 'sheet-top',
			bottom: 'sheet-bottom',
			left: 'sheet-left',
			right: 'sheet-right',
		},
	},
	defaultVariants: {
		side: 'right',
	},
});
