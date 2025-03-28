type SidebarDefaultProps = {
	children?: React.ReactNode;
	className?: string;
};

type SidebarLinkProps = SidebarDefaultProps & {
	href: string;
	icon?: string;
	tooltip?: string;
};

type SidebarProviderProps = SidebarDefaultProps & {
	onOpenChange?: (open: boolean) => void;
} & (
		| {
				defaultOpen?: boolean;
				open?: never;
		  }
		| {
				defaultOpen?: never;
				open?: boolean;
		  }
	);

export type { SidebarDefaultProps, SidebarLinkProps, SidebarProviderProps };
