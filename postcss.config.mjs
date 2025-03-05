import tailwindcss from '@tailwindcss/postcss';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

export default {
	plugins: [
		tailwindcss({
			optimize: {
				minify: true,
			},
		}),
		postcssNested,
		cssnano({}),
	],
};
