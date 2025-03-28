import { useCallback, useEffect } from 'react';

type KeyHandler = (event: globalThis.KeyboardEvent) => void;

interface UseKeyOptions {
	enabled?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}

const parseKeyCombo = (combo: string) => {
	const parts = combo
		.toLowerCase()
		.split('+')
		.map(p => p.trim());
	return {
		key: parts.find(p => !['alt', 'ctrl', 'meta', 'shift'].includes(p)) || '',
		modifiers: new Set(parts.filter(p => ['alt', 'ctrl', 'meta', 'shift'].includes(p))),
	};
};

const useKey = (
	eventType: 'keydown' | 'keyup',
	keyCombo: string,
	handler?: KeyHandler,
	options?: UseKeyOptions,
) => {
	const { enabled = true, preventDefault = false, stopPropagation = false } = options || {};

	const keyHandler = useCallback(
		(event: globalThis.KeyboardEvent) => {
			if (!handler || !enabled) return;
			const { key, modifiers } = parseKeyCombo(keyCombo);
			if (
				(!key || event.key.toLowerCase() === key) &&
				[...modifiers].every(mod => event[`${mod}Key` as keyof globalThis.KeyboardEvent])
			) {
				if (preventDefault) event.preventDefault();
				if (stopPropagation) event.stopPropagation();
				handler(event);
			}
		},
		[keyCombo, handler, enabled, preventDefault, stopPropagation],
	);

	useEffect(() => {
		if (!enabled) return;
		window.addEventListener(eventType, keyHandler);
		return () => window.removeEventListener(eventType, keyHandler);
	}, [keyHandler, enabled]);
};

const useKeyDown = (keyCombo: string, handler?: KeyHandler, options?: UseKeyOptions) =>
	useKey('keydown', keyCombo, handler, options);

const useKeyUp = (keyCombo: string, handler?: KeyHandler, options?: UseKeyOptions) =>
	useKey('keyup', keyCombo, handler, options);

export { useKeyDown, useKeyUp };
