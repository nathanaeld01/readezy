import { SidebarProvider } from '../components/ui/sidebar';
import { cn } from '@/admin/lib/utils';
import { AppSidebar } from '../components/layout/sidebar';
import { Topbar } from '../components/layout/topbar';

type Props = {
	className?: string;
	children?: React.ReactNode;
};

export const AdminLayout = ({ className, children }: Props) => {
	return (
		<SidebarProvider variant="compact">
			<AppSidebar />
			<div className="grid size-full grid-rows-[auto_1fr_auto]">
				<Topbar />
				<main className={cn('container p-8', className)}>{children}</main>
				<footer></footer>
			</div>
		</SidebarProvider>
	);
};
