import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import { useIsMobile } from '../hooks/use-mobile';
import { useKeyDown } from '../hooks/use-key';

const SIDEBAR_COOKIE_NAME = 'sidebar-state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 year
const SIDEBAR_KEYBOARD_SHORTCUT = 'ctrl+b';

type SidebarState = {
	isOpen: boolean;
	isOpenMobile: boolean;
	state: 'expanded' | 'collapsed';
	variant: 'compact' | 'default';
	setOpen: (value: boolean) => void;
	setOpenMobile: (value: boolean) => void;
	toggle: () => void;
};

// Single store instance
const sidebarStore = create<SidebarState>((set, get) => ({
	isOpen: true,
	isOpenMobile: false,
	state: 'expanded',
	variant: 'default',
	setOpen: value => {
		set({ isOpen: value, state: value ? 'expanded' : 'collapsed' });
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	},
	setOpenMobile: value => set({ isOpenMobile: value }),
	toggle: () => {
		const { isOpen, isOpenMobile, setOpen, setOpenMobile } = get();
		if (window.matchMedia('(max-width: 768px)').matches) {
			setOpenMobile(!isOpenMobile);
		} else {
			setOpen(!isOpen);
		}
	},
}));

type UseSidebarOptions = {
	defaultOpen?: boolean;
	open?: boolean;
	variant?: 'compact' | 'default';
	onOpenChange?: (open: boolean) => void;
};

export const useSidebarStore = ({
	defaultOpen,
	open,
	variant,
	onOpenChange,
}: UseSidebarOptions) => {
	const isMobile = useIsMobile();
	const store = sidebarStore();

	useEffect(() => {
		if (defaultOpen !== undefined && open === undefined) store.setOpen(defaultOpen);
	}, [defaultOpen, open, store.setOpen]);

	useEffect(() => {
		const unsubscribe = sidebarStore.subscribe(
			({ isOpen }) => open === undefined && onOpenChange?.(isOpen),
		);
		return unsubscribe;
	}, [onOpenChange, open]);

	const handleSetOpen = useCallback(
		(value: boolean) => (open !== undefined ? onOpenChange?.(value) : store.setOpen(value)),
		[open, onOpenChange, store.setOpen],
	);

	useKeyDown(SIDEBAR_KEYBOARD_SHORTCUT, store.toggle, {
		preventDefault: true,
	});

	return {
		...store,
		isMobile,
		variant,
		isOpen: open ?? store.isOpen,
		setOpen: handleSetOpen,
	};
};
