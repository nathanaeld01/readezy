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

type SidebarLinkProps = SidebarDefaultProps & {
	href: string;
	icon?: string;
	tooltip?: string;
};

export type { SidebarDefaultProps, SidebarProviderProps, SidebarLinkProps };
