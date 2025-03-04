type SidebarProviderProps = {
	onOpenChange?: (open: boolean) => void;
	children?: React.ReactNode;
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

type SidebarProps = {
	children?: React.ReactNode;
};

type SidebarHeaderProps = {
	className?: string;
	children?: React.ReactNode;
};

export type { SidebarProviderProps, SidebarProps, SidebarHeaderProps };
