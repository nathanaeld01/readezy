import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

import { useKeyDown } from '../hooks/use-key';
import { useIsMobile } from '../hooks/use-mobile';

const SIDEBAR_COOKIE_NAME = 'sidebar-state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 year
const SIDEBAR_KEYBOARD_SHORTCUT = 'ctrl+b';

type SidebarState = {
	isOpen: boolean;
	isOpenMobile: boolean;
	setOpen: (value: boolean) => void;
	setOpenMobile: (value: boolean) => void;
	state: 'collapsed' | 'expanded';
	toggle: () => void;
	variant: 'compact' | 'default';
};

// Single store instance
const sidebarStore = create<SidebarState>((set, get) => ({
	isOpen: true,
	isOpenMobile: false,
	setOpen: value => {
		set({ isOpen: value, state: value ? 'expanded' : 'collapsed' });
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	},
	setOpenMobile: value => set({ isOpenMobile: value }),
	state: 'expanded',
	toggle: () => {
		const { isOpen, isOpenMobile, setOpen, setOpenMobile } = get();
		if (window.matchMedia('(max-width: 768px)').matches) {
			setOpenMobile(!isOpenMobile);
		} else {
			setOpen(!isOpen);
		}
	},
	variant: 'default',
}));

type UseSidebarOptions = {
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
	variant?: 'compact' | 'default';
};

export const useSidebarStore = ({
	defaultOpen,
	onOpenChange,
	open,
	variant,
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
		isOpen: open ?? store.isOpen,
		setOpen: handleSetOpen,
		variant,
	};
};
