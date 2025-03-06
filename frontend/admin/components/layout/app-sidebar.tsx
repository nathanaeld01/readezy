import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
} from '../ui/sidebar';
import { Logo } from './logo';

export const AppSidebar = () => {
	return (
		<Sidebar variant="compact">
			<SidebarHeader className="flex items-center px-6">
				<Logo className="-mb-1.5 h-7" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup></SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
