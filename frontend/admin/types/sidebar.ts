type SidebarDefaultProps = {
	children?: React.ReactNode;
	className?: string;
};

type SidebarProviderProps = SidebarDefaultProps & {
	onOpenChange?: (open: boolean) => void;
} & (
		| {
				open?: boolean;
				defaultOpen?: never;
		  }
		| {
				defaultOpen?: boolean;
				open?: never;
		  }
	);

type SidebarButtonProps = SidebarDefaultProps & {
	icon?: string;
	collapasible?: boolean;
};

type SidebarLinkProps = SidebarDefaultProps & {
	href: string;
	icon?: string;
	isSub?: boolean;
};

export type {
	SidebarDefaultProps,
	SidebarProviderProps,
	SidebarButtonProps,
	SidebarLinkProps,
};
