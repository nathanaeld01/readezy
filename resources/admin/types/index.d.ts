import '@tanstack/react-table';

declare module '@tanstack/react-table' {
	interface ColumnMeta {
		className?: string; // Add className as an optional property
	}
}

interface Auth {
	user?: {
		email: string;
		id: string;
		name: string;
	};
}

type ChildrenType<F extends Record<string, () => void>> = {
	children?: ((params: F) => React.ReactNode) | React.ReactNode;
};

interface PageProps {
	auth: Auth;
}
