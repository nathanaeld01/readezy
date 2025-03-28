import { createColumnHelper, type OnChangeFn, type RowSelectionState } from '@tanstack/react-table';
import { Link, usePage } from '@inertiajs/react';

import { Checkbox } from '../ui/checkbox';
import { DataTable, DataTableBody, DataTableHeader } from '../ui/data-table';

type Author = {
	slug: string;
	title: string;
	image_url: string;
};

const columnHelper = createColumnHelper<Author>();
const columns = [
	columnHelper.group({
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor('image_url', {
		header: 'Image',
		cell: ({ row, cell }) => (
			<img
				className="inline size-10 rounded-full object-cover"
				src={cell.getValue()}
				alt={row.original.title}
			/>
		),
		meta: {
			className: 'w-20 text-center',
		},
	}),
	columnHelper.accessor('title', {
		header: 'Name',
		cell: ({ row, cell }) => (
			<Link
				className="underline underline-offset-2"
				href={route('admin.authors.show', row.original.slug)}
			>
				{cell.getValue()}
			</Link>
		),
	}),
];

export const ViewAuthorsTable = ({
	selected: rowSelection,
	onSelect: setRowSelection,
}: {
	selected: RowSelectionState;
	onSelect: OnChangeFn<RowSelectionState>;
}) => {
	const { authors } = usePage().props;

	return (
		<DataTable
			data={authors as Author[]}
			columns={columns}
			options={{
				state: {
					rowSelection,
				},
				enableRowSelection: true,
				onRowSelectionChange: setRowSelection,
				getRowId: original => original.slug,
			}}
		>
			{table => (
				<>
					<DataTableHeader table={table} />
					<DataTableBody table={table} />
				</>
			)}
		</DataTable>
	);
};
