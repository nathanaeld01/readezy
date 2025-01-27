<script setup lang="ts">
	import { Button } from '../ui/button';
	import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from '../ui/sheet';
</script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button>
				<i class="ri-add-line" />
				Add Genre
			</Button>
		</SheetTrigger>
		<SheetModal>
			<SheetHeader>
				<SheetTitle>Add Genre</SheetTitle>
			</SheetHeader>
			<SheetContent>
				<form id="create-genre" class="form"></form>
			</SheetContent>
			<SheetFooter>
				<Button form="create-genre" variant="secondary" size="sm" type="reset">Rest Form</Button>
				<Button form="create-genre" variant="primary" size="sm" type="submit">Create Genre</Button>
			</SheetFooter>
		</SheetModal>
	</Sheet>
</template>
