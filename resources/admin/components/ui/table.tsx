import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
	return (
		<div data-slot="table-container" className="relative w-full overflow-x-auto">
			<table
				data-slot="table"
				className={cn(
					'w-full table-auto caption-bottom border border-border text-sm',
					className,
				)}
				{...props}
			/>
		</div>
	);
};

const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
	return (
		<thead
			data-slot="table-header"
			className={cn('[&_tr]:border-b [&_tr]:bg-muted/30 [&_tr]:hover:bg-muted/30', className)}
			{...props}
		/>
	);
};

const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr:last-child]:border-0', className)}
			{...props}
		/>
	);
};

const TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	);
};

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				'divide-x divide-border border-b border-border transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted/50',
				className,
			)}
			{...props}
		/>
	);
};

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:w-16 [&:has([role=checkbox])]:text-center',
				className,
			)}
			{...props}
		/>
	);
};

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				'table-cell px-4 py-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:w-16 [&:has([role=checkbox])]:text-center',
				className,
			)}
			{...props}
		/>
	);
};

const TableCaption = ({ className, ...props }: React.ComponentProps<'caption'>) => {
	return (
		<caption
			data-slot="table-caption"
			className={cn('mt-4 text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
};

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
