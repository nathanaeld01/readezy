<script setup>
	const props = defineProps({
		class: {
			type: null,
			required: false,
		},
	});
</script>

<template>
	<div class="table-wrap">
		<table class="table" :class="props.class">
			<slot />
		</table>
	</div>
</template>

<style lang="postcss">
	.table-wrap {
		@apply w-full overflow-x-auto;
	}

	.table {
		@apply w-full min-w-[768px] caption-bottom text-sm;
		table-layout: auto;

		.table-caption {
			@apply mt-4 text-sm text-muted-foreground;
		}

		.table-row:not(:last-of-type), thead .table-row:only-of-type {
			@apply border-b border-border;
		}

		.table-title {
			@apply px-4 py-2.5 align-middle;
		}

		.table-data {
			@apply px-4 py-2.5 align-middle [&:has([role=checkbox])]:pr-0;
		}

		.table-actions {
			@apply flex gap-2;
		}

		.table-title, .table-data {
			@apply  text-center;
			
			&.table-left {
				@apply text-left;
			}

			&.table-right {
				@apply text-right;
			}
		}
	}

	.table .table-row:has(th) {
		@apply bg-muted/25;
	}

	.table .table-body .table-row {
		@apply transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted;
	}
</style>
