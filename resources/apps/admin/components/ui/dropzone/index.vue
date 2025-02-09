<script setup>
	import { parseAccept, validateAccept } from '@/js/lib/dropzone';
	import { imageSize, imageUrl } from '@/js/lib/utils';
	import { useDropZone } from '@vueuse/core';
	import { computed, ref } from 'vue';

	const props = defineProps({
		modelValue: {
			type: [Array, Object, null],
			default: null,
		},
		defaultValue: {
			type: [Array, Object, null],
			default: null,
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		accept: {
			type: String,
			default: '*/*',
			validator: validateAccept,
		},
	});

	const emit = defineEmits(['update:modelValue']);
	const dropzoneRef = ref(null);
	const inputRef = ref(null);

	const modelValue = computed({
		get: () => props.modelValue ?? [],
		set: (value) => emit('update:modelValue', (props.multiple ? value : value[0]) ?? null),
	});

	const { isOverDropZone } = useDropZone(dropzoneRef, {
		onDrop: async (files) => {
			try {
				const dataTransfer = new DataTransfer();
				files.forEach((file) => dataTransfer.items.add(file));
				if (inputRef.value) {
					inputRef.value.files = dataTransfer.files;
				}
				modelValue.value = dataTransfer.files;
			} catch (error) {
				console.error('Error handling file drop:', error);
			}
		},
		dataTypes: parseAccept(props.accept),
		multiple: props.multiple,
	});

	const onChange = (event) => {
		modelValue.value = event.target.files;
	};
	const onRemove = (index) => {
		const files = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value];
		modelValue.value = files.filter((_, i) => i !== index);
	};

	const displayValue = computed(() =>
		(Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]).filter(Boolean).map((file) => ({
			name: file.name,
			size: imageSize(file.size),
			url: imageUrl(file),
		})),
	);
</script>

<template>
	<div class="space-y-2">
		<div
			ref="dropzoneRef"
			class="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-input text-sm text-muted-foreground transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
			:class="{ 'border-primary': isOverDropZone }"
			@click="inputRef.click()"
		>
			<input ref="inputRef" type="file" class="hidden" :multiple :accept @change="onChange" />
			<p class="text-center">
				<template v-if="!displayValue.length">Drop files here or click to upload</template>
				<template v-else>{{ displayValue.length }} file(s) selected</template>
			</p>
		</div>
		<div v-if="displayValue.length" class="mt-2 flex w-full flex-col gap-1 overflow-hidden">
			<div
				v-for="(image, index) in displayValue"
				:key="`${image.name}-${index}`"
				class="group grid grid-cols-[2.5rem_auto_1.5rem] items-center gap-2"
			>
				<img :src="image.url" class="size-10 rounded-md object-cover" :alt="image.name" />
				<div class="flex min-w-0 flex-col justify-center overflow-hidden pr-2 text-sm">
					<div class="truncate">
						{{ image.name }}
					</div>
					<span class="truncate leading-none text-foreground/50">{{ image.size }}</span>
				</div>
				<button
					class="flex size-6 cursor-pointer items-center justify-center rounded-md text-destructive opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-muted/75"
					@click="onRemove(index)"
				>
					<i class="ri-close-line text-lg"></i>
				</button>
			</div>
		</div>
	</div>
</template>
