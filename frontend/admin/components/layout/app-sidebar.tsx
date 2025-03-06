import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupTitle,
	SidebarHeader,
	SidebarMenuLink,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuButton,
} from '../ui/sidebar';
import { Logo } from './logo';

export const AppSidebar = () => {
	return (
		<Sidebar variant="compact" rail>
			<SidebarHeader className="flex items-center px-6">
				<Logo className="-mb-1.5 h-7" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuLink
								icon="hgi-dashboard-square-02"
								href="/"
							>
								<span>Dashboard</span>
							</SidebarMenuLink>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupTitle>Resources</SidebarGroupTitle>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									icon="hgi-dashboard-square-02"
									collapasible
								>
									<span>Authors</span>
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem></SidebarMenuSubItem>
									<SidebarMenuSubItem></SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
