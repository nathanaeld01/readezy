import { Link } from '@inertiajs/react';

import { Avatar, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarTrigger } from '../ui/sidebar';
import { cn } from '@/admin/lib/utils';

type ItemProps = {
	children: React.ReactNode;
	href: string;
	icon?: string;
};

const DropdownLink = ({ children, href, icon }: ItemProps) => {
	return (
		<DropdownMenuItem asChild className="cursor-pointer gap-2">
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
			<div className="flex h-full items-center justify-between px-8">
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
						<DropdownMenuContent align="end" className="mt-1 min-w-65" side="bottom">
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
								<DropdownLink href="/profile" icon="hgi-user">
									Profile
								</DropdownLink>
								<DropdownLink
									href="/profile/settings"
									icon="hgi-account-setting-01"
								>
									Settings
								</DropdownLink>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownLink href="/logout" icon="hgi-logout-01">
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
