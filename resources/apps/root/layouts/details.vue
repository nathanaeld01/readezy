<script>
	export default {
		name: 'DetailsLayout',
	};
</script>

<template>
	<div class="size-fit lg:sticky lg:top-28">
		<slot name="image" />
	</div>
	<article class="layout-article">
		<slot />
	</article>
</template>