import * as React from 'react';

import { cn } from '@/admin/lib/utils';

const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
	return (
		<div className="relative w-full overflow-x-auto" data-slot="table-container">
			<table
				className={cn(
					'w-full table-auto caption-bottom border border-border text-sm',
					className,
				)}
				data-slot="table"
				{...props}
			/>
		</div>
	);
};

const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
	return (
		<thead
			className={cn('[&_tr]:border-b [&_tr]:bg-muted/30 [&_tr]:hover:bg-muted/30', className)}
			data-slot="table-header"
			{...props}
		/>
	);
};

const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
	return (
		<tbody
			className={cn('[&_tr:last-child]:border-0', className)}
			data-slot="table-body"
			{...props}
		/>
	);
};

const TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => {
	return (
		<tfoot
			className={cn(
				'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
				className,
			)}
			data-slot="table-footer"
			{...props}
		/>
	);
};

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
	return (
		<tr
			className={cn(
				'divide-x divide-border border-b border-border transition-colors hover:bg-muted/15 data-[state=selected]:bg-muted/50',
				className,
			)}
			data-slot="table-row"
			{...props}
		/>
	);
};

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
	return (
		<th
			className={cn(
				'h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:w-16 [&:has([role=checkbox])]:text-center',
				className,
			)}
			data-slot="table-head"
			{...props}
		/>
	);
};

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
	return (
		<td
			className={cn(
				'table-cell px-4 py-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:w-16 [&:has([role=checkbox])]:text-center',
				className,
			)}
			data-slot="table-cell"
			{...props}
		/>
	);
};

const TableCaption = ({ className, ...props }: React.ComponentProps<'caption'>) => {
	return (
		<caption
			className={cn('mt-4 text-sm text-muted-foreground', className)}
			data-slot="table-caption"
			{...props}
		/>
	);
};

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
