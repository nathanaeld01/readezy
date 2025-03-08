import { Link } from '@inertiajs/react';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { SidebarTrigger } from '../components/ui/sidebar';
import { cn } from '~/lib/utils';

type ItemProps = {
	href: string;
	icon?: string;
	children: React.ReactNode;
};

const DropdownLink = ({ href, icon, children }: ItemProps) => {
	return (
		<DropdownMenuItem className="cursor-pointer gap-2" asChild>
			<Link href={href}>
				{icon && <i className={cn('hgi hgi-stroke text-lg', icon)} />}
				<span>{children}</span>
			</Link>
		</DropdownMenuItem>
	);
};

export const Topbar = () => {
	return (
		<header className="flex h-16 items-center justify-between border-b border-border px-8">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
			</div>
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar>
							<AvatarImage
								className="cursor-pointer"
								src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"
							/>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side="bottom"
						align="end"
						className="mt-1 min-w-65"
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="flex flex-col gap-1 leading-none">
								<span>Nathanael D&apos;Cunha</span>
								<span className="text-xs text-muted-foreground">
									admin@example.com
								</span>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownLink icon="hgi-user" href="/profile">
								Profile
							</DropdownLink>
							<DropdownLink
								icon="hgi-account-setting-01"
								href="/profile/settings"
							>
								Settings
							</DropdownLink>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownLink icon="hgi-logout-01" href="/logout">
								Logout
							</DropdownLink>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
