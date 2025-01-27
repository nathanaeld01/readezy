<script setup lang="ts">
	import { Button } from '../ui/button';
	import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from '../ui/sheet';
</script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button>
				<i class="ri-add-line" />
				Add Book
			</Button>
		</SheetTrigger>
		<SheetModal>
			<SheetHeader>
				<SheetTitle>Create Book</SheetTitle>
			</SheetHeader>
			<SheetContent>
				<form id="create-book" class="form"></form>
			</SheetContent>
			<SheetFooter class="flex-col">
				<Button form="create-book" variant="secondary" type="reset">Reset Form</Button>
				<Button form="create-book" type="submit">Create Book</Button>
			</SheetFooter>
		</SheetModal>
	</Sheet>
</template>
