import { Link } from '@inertiajs/react';
import { createContext, useContext } from 'react';

import { Button } from './button';
import { Sheet, SheetModal } from './sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { useSidebarStore } from '@/admin/context/sidebar';
import { cn } from '@/admin/lib/utils';
import type {
	SidebarDefaultProps,
	SidebarLinkProps,
	SidebarProviderProps,
} from '@/admin/types/sidebar';

const SidebarContext = createContext<null | ReturnType<typeof useSidebarStore>>(null);

const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) throw new Error('useSidebar must be used within a SidebarProvider');

	return context;
};

const SidebarProvider = ({
	children,
	className,
	defaultOpen,
	onOpenChange,
	open,
	variant = 'default',
}: SidebarProviderProps & {
	variant?: 'compact' | 'default';
}) => {
	const store = useSidebarStore({
		defaultOpen,
		onOpenChange,
		open,
		variant,
	});

	return (
		<SidebarContext.Provider value={store}>
			<TooltipProvider>
				<div
					className={cn(
						'group/wrapper size-full md:grid md:grid-cols-sidebar',
						className,
					)}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
};

const Sidebar = ({
	children,
	rail = false,
}: SidebarDefaultProps & {
	rail?: boolean;
}) => {
	const { isMobile, isOpenMobile, setOpenMobile, state, variant } = useSidebar();

	if (isMobile) {
		return (
			<Sheet onOpenChange={setOpenMobile} open={isOpenMobile}>
				<SheetModal variant="sidebar">{children}</SheetModal>
			</Sheet>
		);
	}

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
		<Button className="size-10" onClick={toggle} size="icon" variant="ghost">
			<i className="hgi hgi-stroke hgi-layout-left text-lg font-semibold" />
		</Button>
	);
};

const SidebarRail = () => {
	const { toggle } = useSidebar();

	return (
		<button
			className="absolute top-0 left-full z-1 h-full w-1 border-r-2 border-transparent transition-[border] duration-150 hover:cursor-w-resize hover:border-sidebar-border"
			onClick={toggle}
			type="button"
		/>
	);
};

const SidebarHeader = ({ children, className }: SidebarDefaultProps) => (
	<div className={cn('h-16 border-b border-sidebar-border', className)}>{children}</div>
);

const SidebarContent = ({ children, className }: SidebarDefaultProps) => {
	return (
		<div className={cn('flex h-full flex-col gap-4 overflow-y-auto py-4', className)}>
			{children}
		</div>
	);
};

const SidebarGroup = ({ children, className }: SidebarDefaultProps) => {
	return <div className={cn('relative w-full px-4', className)}>{children}</div>;
};

const SidebarGroupTitle = ({ children, className }: SidebarDefaultProps) => {
	return (
		<div
			className={cn(
				'flex h-8 items-center text-xs/none text-sidebar-foreground transition-[opacity,height,margin] duration-150 icon-collapsed:-mt-2 icon-collapsed:h-0 icon-collapsed:opacity-0',
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
	return <li className="relative">{children}</li>;
};

const SidebarMenuLink = ({ children, href, icon, tooltip }: SidebarLinkProps) => {
	const { variant } = useSidebar();
	const active = route().current(href.replace(/index$/, '*'));

	const item = (
		<Link
			className={cn(
				'inline-flex h-11 w-full flex-nowrap items-center overflow-hidden border border-transparent px-3 text-sm/none whitespace-nowrap text-sidebar-foreground transition-[width,background,color] duration-[250ms,150ms,150ms] hover:border-sidebar-border hover:bg-sidebar-accent icon-collapsed:w-11',
				active &&
					'bg-sidebar-primary text-sidebar-primary-foreground hover:border-transparent hover:bg-sidebar-primary/80',
			)}
			href={route(href)}
		>
			{icon && <i className={cn('hgi hgi-stroke pr-3 text-lg font-bold', icon)} />}
			<span className="inline-block w-full icon-collapsed:hidden">{children}</span>
		</Link>
	);

	if (tooltip && variant === 'compact') {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{item}</TooltipTrigger>
				<TooltipContent
					align="center"
					className="ml-2.5 hidden h-9 min-w-20 items-center justify-center border border-sidebar-border bg-sidebar-background text-sm/none icon-collapsed:inline-flex"
					side="right"
				>
					{tooltip}
				</TooltipContent>
			</Tooltip>
		);
	}

	return item;
};

export {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupTitle,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuLink,
	SidebarProvider,
	SidebarTrigger,
};
