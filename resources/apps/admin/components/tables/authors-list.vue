<script setup>
	import { Link } from '@inertiajs/vue3';
	import { createColumnHelper, FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
	import { h, ref } from 'vue';

	import { Checkbox } from '../ui/checkbox';
	import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '../ui/table';

	const props = defineProps({
		data: { type: Array, default: () => [], required: false },
		rowCount: { type: Number, default: 10, required: false },
	});
	const emits = defineEmits(['update:rowSelection']);

	const columnHelper = createColumnHelper();
	const rowSelection = ref({});

	const columns = ref([
		columnHelper.group({
			id: 'select',
			header: ({ table }) =>
				h(Checkbox, {
					checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
					'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
					disabled: table.getCoreRowModel().rows.length === 0,
					ariaLabel: 'Select all',
				}),
			cell: ({ row }) =>
				h(Checkbox, {
					checked: row.getIsSelected(),
					'onUpdate:checked': (value) => row.toggleSelected(!!value),
					ariaLabel: 'Select row',
				}),
			enableSorting: false,
			enableHiding: false,
			headerClass: 'w-4',
			cellClass: 'w-4',
		}),
		columnHelper.group({
			accessorKey: 'image_url',
			header: 'Image',
			cell: ({ row }) =>
				h('img', {
					src: row.getValue('image_url'),
					alt: row.original.title,
					class: 'size-10 object-cover rounded-full',
				}),
			headerClass: 'w-18 text-center',
		}),
		columnHelper.group({
			accessorKey: 'title',
			header: 'Name',
			cell: ({ row }) =>
				h(Link, { href: `/authors/${row.original.slug}`, class: 'underline' }, () => row.original.title),
		}),
		columnHelper.group({
			accessorKey: 'books_count',
			header: 'Books',
			cell: ({ row }) => row.original.books_count,
			headerClass: 'w-28 text-center',
			cellClass: 'text-center',
		}),
		columnHelper.group({
			accessorKey: 'series_count',
			header: 'Series',
			cell: ({ row }) => row.original.series_count,
			headerClass: 'w-28 text-center',
			cellClass: 'text-center',
		}),
	]);

	const table = useVueTable({
		get data() {
			return props.data;
		},
		get columns() {
			return columns.value;
		},
		onRowSelectionChange: (updateOrValue) => {
			rowSelection.value =
				typeof updateOrValue === 'function' ? updateOrValue(rowSelection.value) : updateOrValue;
			emits('update:rowSelection', Object.keys(rowSelection.value));
		},
		getRowId: (row) => row.slug,
		state: {
			get rowSelection() {
				return rowSelection.value;
			},
		},
		enableRowSelection: true,
		manualPagination: true,
		rowCount: props.rowCount,
		getCoreRowModel: getCoreRowModel(),
	});
</script>

<template>
	<Table>
		<TableHeader>
			<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
				<TableHead
					v-for="header in headerGroup.headers"
					:key="header.id"
					:class="header.column.columnDef.headerClass"
				>
					<FlexRender
						v-if="!header.isPlaceholder"
						:render="header.column.columnDef.header"
						:props="header.getContext()"
					/>
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<template v-if="table.getRowModel().rows?.length">
				<TableRow v-for="row in table.getRowModel().rows" :key="row.id">
					<TableCell
						v-for="cell in row.getAllCells()"
						:key="cell.id"
						:class="cell.column.columnDef.cellClass"
					>
						<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
					</TableCell>
				</TableRow>
			</template>
			<template v-else>
				<TableEmpty :colspan="table.getAllColumns().length">No authors found.</TableEmpty>
			</template>
		</TableBody>
	</Table>
</template>
