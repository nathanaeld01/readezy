import { SidebarTrigger } from '../components/ui/sidebar';

export const Topbar = () => {
	return (
		<header className="flex h-16 items-center justify-between border-b border-border px-4">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
			</div>
		</header>
	);
};
