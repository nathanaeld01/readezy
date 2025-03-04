import { SidebarIcon } from 'lucide-react';
import { createContext, useContext } from 'react';

import { useSidebarStore } from '@/admin/context/sidebar';
import { Button } from './button';
import { cn } from '~/lib/utils';
import {
	SidebarHeaderProps,
	SidebarProps,
	SidebarProviderProps,
} from '@/admin/types/sidebar';

const SidebarContext = createContext<ReturnType<typeof useSidebarStore> | null>(
	null,
);

const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context)
		throw new Error('useSidebar must be used within a SidebarProvider');

	return context;
};

const SidebarProvider = ({
	open,
	defaultOpen,
	onOpenChange,
	children,
}: SidebarProviderProps) => {
	const store = useSidebarStore({
		open,
		defaultOpen,
		onOpenChange,
	});

	return (
		<SidebarContext.Provider value={store}>
			<div
				className={cn('group/wrapper grid size-full grid-cols-sidebar')}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

const Sidebar = ({ variant = 'default', children }: SidebarProps) => {
	const { state } = useSidebar();

	return (
		<aside
			className="group/sidebar relative size-full max-w-sidebar overflow-hidden bg-sidebar-background text-sidebar-foreground transition-[max-width] duration-250"
			data-state={state}
			data-variant={variant}
		>
			<div className="relative h-full w-sidebar transition-[width] duration-250"></div>
			<div
				className={cn(
					'fixed top-0 right-0 left-0 z-0 h-full w-sidebar border-r border-sidebar-border transition-[width,right] duration-250',
				)}
			>
				{children}
			</div>
		</aside>
	);
};

const SidebarTrigger = () => {
	const { toggle } = useSidebar();

	return (
		<Button variant="ghost" size="icon" className="size-9" onClick={toggle}>
			<SidebarIcon className="size-5" />
		</Button>
	);
};

const SidebarHeader = ({ className, children }: SidebarHeaderProps) => (
	<div className={cn('h-16 border-b border-sidebar-border', className)}>
		{children}
	</div>
);

export { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader };
