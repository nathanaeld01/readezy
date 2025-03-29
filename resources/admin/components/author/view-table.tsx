import { Deferred, Link, usePage } from '@inertiajs/react';
import { createColumnHelper, type OnChangeFn, type RowSelectionState } from '@tanstack/react-table';

import { Checkbox } from '../ui/checkbox';
import { DataTable, DataTableBody, DataTableHeader, DataTableLoading } from '../ui/data-table';
import { buttonVariants } from '@/admin/lib/variants';

type Author = {
	image_url: string;
	slug: string;
	title: string;
};

const columnHelper = createColumnHelper<Author>();
const columns = [
	columnHelper.group({
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
			/>
		),
		enableHiding: false,
		enableSorting: false,
		header: ({ table }) => (
			<Checkbox
				aria-label="Select all"
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		id: 'select',
	}),
	columnHelper.accessor('image_url', {
		cell: ({ cell, row }) => (
			<img
				alt={row.original.title}
				className="inline size-10 rounded-full object-cover"
				src={cell.getValue()}
			/>
		),
		header: 'Image',
		meta: {
			className: 'w-20 text-center',
		},
	}),
	columnHelper.accessor('title', {
		cell: ({ cell, row }) => (
			<Link
				className="underline underline-offset-2"
				href={route('admin.authors.show', row.original.slug)}
			>
				{cell.getValue()}
			</Link>
		),
		header: 'Name',
	}),
	columnHelper.display({
		cell: ({ row }) => (
			<>
				<Link
					className={buttonVariants({
						className: 'size-8',
						size: 'icon',
						variant: 'ghost',
					})}
					href={route('admin.authors.edit', row.original.slug)}
				>
					<i className="hgi hgi-stroke hgi-edit-02 text-lg" />
				</Link>
			</>
		),
		id: 'actions',
		meta: {
			className: 'w-20',
		},
	}),
];

export const ViewAuthorsTable = ({
	onSelect: setRowSelection,
	selected: rowSelection,
}: {
	onSelect: OnChangeFn<RowSelectionState>;
	selected: RowSelectionState;
}) => {
	const { authors = [] } = usePage().props;

	return (
		<DataTable
			columns={columns}
			data={authors as Author[]}
			options={{
				enableRowSelection: true,
				getRowId: original => original.slug,
				onRowSelectionChange: setRowSelection,
				state: {
					rowSelection,
				},
			}}
		>
			{table => (
				<>
					<DataTableHeader table={table} />
					<Deferred data="authors" fallback={<DataTableLoading table={table} />}>
						<DataTableBody table={table} />
					</Deferred>
				</>
			)}
		</DataTable>
	);
};
