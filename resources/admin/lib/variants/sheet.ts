import { cva, VariantProps } from 'class-variance-authority';

const sheetVariants = cva(
	'fixed z-50 flex flex-col shadow-lg transition open:animate-in focus-visible:outline-none closed:animate-out',
	{
		variants: {
			variant: {
				form: 'inset-y-3 right-3 h-[calc(100%-1.5rem)] w-full max-w-[80%] border border-border bg-card open:duration-500 open:slide-in-from-right sm:max-w-sm closed:duration-300 closed:slide-out-to-right',
				sidebar:
					'top-0 left-0 h-full w-sidebar border-r border-border bg-sidebar-background duration-250 open:slide-in-from-left closed:slide-out-to-left',
			},
		},
	},
);

type SheetVariants = VariantProps<typeof sheetVariants>;

export default sheetVariants;
export type { SheetVariants };
