import { createContext, useContext } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { useSidebarStore } from '@/admin/context/sidebar';
import type {
	SidebarDefaultProps,
	SidebarLinkProps,
	SidebarProviderProps,
} from '@/admin/types/sidebar';
import { Button } from './button';
import { cn } from '~/lib/utils';

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
	className,
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
				className={cn(
					'group/wrapper grid size-full grid-cols-sidebar',
					className,
				)}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

const Sidebar = ({
	variant = 'default',
	rail = false,
	children,
}: SidebarDefaultProps & {
	variant?: 'default' | 'compact';
	rail?: boolean;
}) => {
	const { state } = useSidebar();

	return (
		<aside
			className="group/sidebar relative size-full max-w-sidebar bg-sidebar-background text-sidebar-foreground transition-[max-width] duration-250"
			data-state={state}
			data-variant={variant}
		>
			<div className="relative h-full w-sidebar transition-[width] duration-250"></div>
			<div className="fixed top-0 left-sidebar z-0 h-full w-sidebar overflow-hidden border-r border-border text-sidebar-foreground transition-[width,left] duration-250">
				{children}
			</div>
			{rail && <SidebarRail />}
		</aside>
	);
};

const SidebarTrigger = () => {
	const { toggle } = useSidebar();

	return (
		<Button variant="ghost" size="icon" className="size-9" onClick={toggle}>
			<i className="hgi hgi-stroke hgi-layout-left text-lg font-semibold" />
		</Button>
	);
};

const SidebarRail = () => {
	const { toggle } = useSidebar();

	return (
		<button
			type="button"
			className="absolute top-0 left-full z-1 h-full w-1 border-r-2 border-transparent transition-[border] duration-150 hover:cursor-w-resize hover:border-sidebar-border"
			onClick={toggle}
		/>
	);
};

const SidebarHeader = ({ className, children }: SidebarDefaultProps) => (
	<div className={cn('h-16 border-b border-sidebar-border', className)}>
		{children}
	</div>
);

const SidebarContent = ({ className, children }: SidebarDefaultProps) => {
	return (
		<div
			className={cn(
				'flex h-full flex-col gap-4 overflow-y-auto py-4',
				className,
			)}
		>
			{children}
		</div>
	);
};

const SidebarGroup = ({ className, children }: SidebarDefaultProps) => {
	return (
		<div className={cn('relative w-full px-4', className)}>{children}</div>
	);
};

const SidebarGroupTitle = ({ className, children }: SidebarDefaultProps) => {
	return (
		<div
			className={cn(
				'flex h-8 items-center text-xs/none text-sidebar-foreground transition-[opacity,height,margin] duration-150 group-data-[state=collapsed]/sidebar:-mt-2 group-data-[state=collapsed]/sidebar:h-0 group-data-[state=collapsed]/sidebar:opacity-0',
				className,
			)}
		>
			<span>{children}</span>
		</div>
	);
};

const SidebarGroupContent = ({ children }: SidebarDefaultProps) => {
	return <div className="flex w-full flex-col">{children}</div>;
};

const SidebarMenu = ({ children }: SidebarDefaultProps) => {
	return <ul className="flex flex-col gap-2">{children}</ul>;
};

const SidebarMenuItem = ({ children }: SidebarDefaultProps) => {
	return <li>{children}</li>;
};

const SidebarMenuLink = ({ href, icon, children }: SidebarLinkProps) => {
	const { url } = usePage();

	return (
		<Link
			className={cn(
				'inline-flex h-11 w-full flex-nowrap items-center overflow-hidden border border-transparent px-3 text-sm/none whitespace-nowrap text-sidebar-foreground transition-[width,background,color] duration-[250ms,150ms,150ms] hover:border-sidebar-border hover:bg-sidebar-accent group-compact-collapsed:w-11',
				url.startsWith(href) &&
					'bg-sidebar-primary text-sidebar-primary-foreground hover:border-transparent hover:bg-sidebar-primary/80',
			)}
			href={href}
		>
			{icon && (
				<i
					className={cn(
						'hgi hgi-stroke pr-3 text-lg font-bold',
						icon,
					)}
				/>
			)}
			<span className="inline-block w-full group-compact-collapsed:hidden">
				{children}
			</span>
		</Link>
	);
};

export {
	SidebarProvider,
	Sidebar,
	SidebarTrigger,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarGroupTitle,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuLink,
};
