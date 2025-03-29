import {
	flexRender,
	getCoreRowModel,
	type TableOptions,
	type Table as TableType,
	useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

const DataTable = <TData,>({
	children,
	columns,
	data,
	options,
}: {
	children: (table: TableType<TData>) => React.ReactNode;
	columns: TableOptions<TData>['columns'];
	data: TData[];
	options?: Omit<TableOptions<TData>, 'columns' | 'data' | 'getCoreRowModel'>;
}) => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		...options,
	});

	return <Table>{children(table)}</Table>;
};

const DataTableHeader = <TData,>({ table }: { table: TableType<TData> }) => {
	return (
		<TableHeader>
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map(header => (
						<TableHead
							className={header.column.columnDef.meta?.className}
							colSpan={header.colSpan}
							key={header.id}
						>
							{header.isPlaceholder
								? null
								: flexRender(header.column.columnDef.header, header.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	);
};

const DataTableBody = <TData,>({ table }: { table: TableType<TData> }) => {
	const rows = table.getRowModel().rows;

	return (
		<TableBody>
			{!rows.length ? (
				<TableRow>
					<TableCell
						className="h-24 text-center"
						colSpan={table.getVisibleFlatColumns().length}
					>
						No results.
					</TableCell>
				</TableRow>
			) : (
				rows.map(row => (
					<TableRow key={row.id}>
						{row.getVisibleCells().map(cell => (
							<TableCell
								className={cell.column.columnDef.meta?.className}
								key={cell.id}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			)}
		</TableBody>
	);
};

const DataTableLoading = <TData,>({
	children = 'Loading...',
	table,
}: {
	children?: React.ReactNode;
	table: TableType<TData>;
}) => (
	<TableBody>
		<TableRow>
			<TableCell className="h-24 text-center" colSpan={table.getVisibleFlatColumns().length}>
				{children}
			</TableCell>
		</TableRow>
	</TableBody>
);

export { DataTable, DataTableBody, DataTableHeader, DataTableLoading };
