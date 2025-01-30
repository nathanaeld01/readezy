<script setup>
	import { onMounted, onUnmounted, provide, ref, watch } from 'vue';

	const state = localStorage.getItem('sidebar:state');
	const toggle = ref(state === 'true' || state === null);
	const onToggle = () => {
		toggle.value = !toggle.value;
		localStorage.setItem('sidebar:state', toggle.value.toString());
	};

	const isMobile = ref(window.innerWidth <= 992);

	const updateIsMobile = () => {
		isMobile.value = window.innerWidth <= 992;
	};

	onMounted(() => {
		window.addEventListener('resize', updateIsMobile);
		updateIsMobile();
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateIsMobile);
	});

	watch(isMobile, (newValue) => {
		if (newValue && toggle.value) {
			toggle.value = false;
		}
	});

	provide('sidebar', { toggle, onToggle, isMobile });
</script>

<template>
	<div class="wrapper">
		<slot />
	</div>
</template>

<style lang="postcss">
	.sidebar {
		@apply border-border bg-card fixed top-0 left-0 z-50 size-full max-w-75 overflow-hidden border-r transition-[max-width] duration-200 lg:relative;

		&.collapsed {
			@apply max-w-0;
		}

		.sidebar-wrapper {
			@apply grid h-full w-75 grid-rows-[auto_1fr_auto];
		}

		.sidebar-header {
			@apply flex items-center justify-center p-2;
		}

		.sidebar-content {
			@apply flex h-full flex-col gap-2 overflow-auto;
		}
	}

	.sidebar-overlay {
		@apply fixed top-0 left-0 z-49 size-full bg-black/50;
	}

	.sidebar-group {
		@apply relative w-full min-w-0 p-2;

		.sidebar-group-title {
			@apply text-foreground/70 ring-ring flex h-8 items-center rounded-md px-2 text-sm font-medium outline-hidden focus-visible:ring-2;
		}

		.sidebar-group-content {
			@apply w-full;
		}
	}

	.sidebar-menu {
		@apply mt-1 flex w-full flex-col gap-1.5;
	}

	.sidebar-menu {
		.sidebar-menu-link,
		.sidebar-menu-button,
		.sidebar-submenu-link {
			@apply text-foreground hover:text-accent-foreground flex h-8 items-center rounded-md px-2.5 py-2 text-sm transition-[background,color] duration-200 select-none;
		}

		.sidebar-menu-link,
		.sidebar-menu-button {
			@apply hover:bg-accent;
		}

		.sidebar-submenu-link {
			@apply hover:bg-accent/60;
		}

		.sidebar-menu-link {
			@apply gap-2.5 leading-none;
		}

		.sidebar-menu-button {
			@apply w-full justify-between font-normal;

			.label {
				@apply flex items-center gap-2.5;
			}
		}

		.sidebar-menu-title {
			@apply text-foreground flex h-8 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm;
		}

		.sidebar-submenu {
			@apply border-border ml-4 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 pt-2;
		}
	}

	.sidebar-menu-link,
	.sidebar-menu-button,
	.sidebar-submenu-link {
		&.active {
			@apply text-accent-foreground font-medium;
		}
	}

	.sidebar-menu-link,
	.sidebar-menu-button {
		&.active {
			@apply bg-accent;
		}
	}

	.sidebar-submenu-link {
		&.active {
			@apply bg-accent/60;
		}
	}

	.sidebar-menu-item:has(.sidebar-submenu a.active) .sidebar-menu-title {
		@apply bg-accent text-accent-foreground font-medium;
	}
</style>
