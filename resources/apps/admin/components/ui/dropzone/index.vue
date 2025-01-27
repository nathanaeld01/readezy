<script setup>
	import { parseAccept, transformFile, validateAccept } from '@/js/lib/dropzone';
	import { useDropZone } from '@vueuse/core';
	import { computed, ref } from 'vue';

	const { multiple, accept, ...props } = defineProps({
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

	const emits = defineEmits(['update:modelValue']);
	const dropzoneRef = ref(null);
	const inputRef = ref(null);

	// Modify the modelValue computed property
	const modelValue = computed(() => {
		return props.modelValue ? (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]) : [];
	});

	const dataHandler = async (data) => {
		const files = await Promise.all(Array.from(data).map(async (file) => await transformFile(file)));
		emits('update:modelValue', multiple ? [...modelValue.value, ...files] : files[0]);
	};

	const { isOverDropZone } = useDropZone(dropzoneRef, {
		onDrop: async (e) => {
			try {
				const dataTransfer = new DataTransfer();
				Array.from(e).forEach((file) => dataTransfer.items.add(file));
				if (inputRef.value) {
					inputRef.value.files = dataTransfer.files;
				}
				await dataHandler(dataTransfer.files);
			} catch (error) {
				console.error(error);
			}
		},
		dataTypes: parseAccept(accept),
		multiple: multiple,
	});

	const onChange = async (e) => await dataHandler(e.target.files);
	const onRemove = (index) => {
		const files = [...modelValue.value];
		files.splice(index, 1);
		emits('update:modelValue', files);
	};

	const hasContent = computed(() => modelValue.value?.length > 0);
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
				<template v-if="!hasContent">Drop files here or click to upload</template>
				<template v-else>{{ modelValue.length }} file(s) selected</template>
			</p>
		</div>
		<div v-if="modelValue.length > 0" class="mt-2 flex w-full flex-col gap-1 overflow-hidden">
			<div v-for="(image, index) in modelValue" :key="`${image.name}-${index}`" class="group flex items-center">
				<img :src="image.url" class="h-10 w-10 rounded-md object-cover" :alt="image.name" />
				<div class="flex flex-1 items-center justify-between pl-4 pr-2">
					<div class="overflow-hidden text-sm">
						<p class="truncate">{{ image.name }}</p>
						<span class="leading-none text-foreground/50">{{ image.size }}</span>
					</div>
					<button
						class="flex size-6 items-center justify-center rounded-md text-destructive opacity-0 transition-opacity duration-200 hover:bg-muted/75 group-hover:opacity-100"
						@click="onRemove(index)"
					>
						<i class="ri-close-line text-lg"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
