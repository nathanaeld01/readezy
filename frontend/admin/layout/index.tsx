import { cn } from '~/lib/utils';
import {
	Sidebar,
	SidebarHeader,
	SidebarProvider,
} from '../components/ui/sidebar';
import { Topbar } from './topbar';
import { Logo } from '../components/layout/logo';

type Props = {
	className?: string;
	children?: React.ReactNode;
};

export const AdminLayout = ({ className, children }: Props) => {
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="flex items-center px-6">
					<Logo className="-mb-1.5 h-7" />
				</SidebarHeader>
			</Sidebar>
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
