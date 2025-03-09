import { cva, VariantProps } from 'class-variance-authority';

// 'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=closed]:animate-out data-[state=open]:duration-500 data-[state=open]:animate-in',
// 					side === 'right' &&
// 						'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
// 					side === 'left' &&
// 						'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
// 					side === 'top' &&
// 						'inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
// 					side === 'bottom' &&
// 						'inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',

const sheetVariants = cva(
	'fixed z-50 flex flex-col shadow-lg transition open:animate-in focus-visible:outline-none closed:animate-out',
	{
		variants: {
			variant: {
				form: 'inset-y-4 right-4 h-[calc(100%-2rem)] w-[calc(100%-1rem)] max-w-[80%] border border-border bg-card open:duration-500 open:slide-in-from-right sm:max-w-sm closed:duration-300 closed:slide-out-to-right',
				sidebar:
					'top-0 left-0 h-full w-sidebar border-r border-border bg-sidebar-background duration-250 open:slide-in-from-left closed:slide-out-to-left',
			},
		},
	},
);

type SheetVariants = VariantProps<typeof sheetVariants>;

export default sheetVariants;
export type { SheetVariants };
