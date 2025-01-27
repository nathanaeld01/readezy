<script setup>
	import { Button } from '@/root/components/ui/button';
	import { Sheet, SheetContent, SheetTrigger } from '@/root/components/ui/sheet';
</script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button variant="ghost" size="lg" class="relative text-xl font-semibold" icon>
				<i class="ri-shopping-cart-line"></i>
			</Button>
		</SheetTrigger>
		<SheetContent>
			<template #header>Cart</template>
		</SheetContent>
	</Sheet>
</template>
