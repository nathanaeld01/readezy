import { SidebarProvider } from '../components/ui/sidebar';
import { AppSidebar } from '../components/layout/app-sidebar';
import { Topbar } from './topbar';
import { cn } from '~/lib/utils';

type Props = {
	className?: string;
	children?: React.ReactNode;
};

export const AdminLayout = ({ className, children }: Props) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="grid size-full grid-rows-[auto_1fr_auto]">
				<Topbar />
				<main className={cn('container p-8', className)}>
					{children}
				</main>
				<footer></footer>
			</div>
		</SidebarProvider>
	);
};
