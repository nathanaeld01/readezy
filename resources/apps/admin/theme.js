import { ref, watchEffect } from 'vue';

// Utility to get the current theme
function getCurrentTheme() {
	if (typeof window === 'undefined') return undefined;
	return (
		localStorage.getItem('admin.readezy.text:theme') ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	);
}

// Apply the theme based on the provided value
function applyTheme(theme) {
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

// Set theme on initial load
function setThemeOnLoad() {
	applyTheme(getCurrentTheme());
}

// Disable animations temporarily
const disableAnimation = () => {
	const style = document.createElement('style');
	style.textContent = `*,*::before,*::after{  -webkit-transition:none!important;  -moz-transition:none!important; -o-transition:none!important;   -ms-transition:none!important;  transition:none!important   }`;
	document.head.appendChild(style);

	return () => {
		// Force a reflow
		window.getComputedStyle(document.body);

		// Remove the style after a short delay
		setTimeout(() => {
			document.head.removeChild(style);
		}, 1);
	};
};

// Main theme management function
function useTheme() {
	const theme = ref(getCurrentTheme());

	const toggleTheme = () => {
		const newTheme = theme.value === 'dark' ? 'light' : 'dark';
		localStorage.setItem('admin.readezy.text:theme', newTheme);
		applyTheme(newTheme);
		theme.value = newTheme;

		watchEffect(disableAnimation());
	};

	return { theme, toggleTheme };
}

export { setThemeOnLoad, useTheme };
