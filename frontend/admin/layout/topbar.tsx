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
		<header className="h-16 border-b border-border">
			<div className="container flex h-full items-center justify-between px-8">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
				</div>
				<div className="flex items-center gap-4">
					<Link
						className="relative inline-flex size-10 items-center justify-center rounded-full transition-[background] duration-150 hover:bg-muted"
						href="/notifications"
					>
						<i className="hgi hgi-stroke hgi-notification-01 text-lg" />
						<span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-destructive text-xs/none text-foreground">
							3
						</span>
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="size-10">
								<AvatarImage
									className="size-10 cursor-pointer"
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
								<DropdownLink
									icon="hgi-logout-01"
									href="/logout"
								>
									Logout
								</DropdownLink>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};
