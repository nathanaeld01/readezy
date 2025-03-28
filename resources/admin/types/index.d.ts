import '@tanstack/react-table';

declare module '@tanstack/react-table' {
	interface ColumnMeta {
		className?: string; // Add className as an optional property
	}
}
