import {
	flexRender,
	getCoreRowModel,
	type TableOptions,
	useReactTable,
	type Table as TableType,
} from '@tanstack/react-table';
import { Table, TableRow, TableCell, TableHeader, TableHead, TableBody } from './table';

const DataTable = <TData,>({
	data,
	columns,
	options,
	children,
}: {
	data: TData[];
	columns: TableOptions<TData>['columns'];
	options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>;
	children: (table: TableType<TData>) => React.ReactNode;
}) => {
	const table = useReactTable({
		data,
		columns,
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
							key={header.id}
							className={header.column.columnDef.meta?.className}
							colSpan={header.colSpan}
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
						colSpan={table.getVisibleFlatColumns().length}
						className="h-24 text-center"
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

export { DataTable, DataTableHeader, DataTableBody };
