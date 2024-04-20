import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'congress-blue': {
					'50': '#f1f7fe',
					'100': '#e1eefd',
					'200': '#bdddfa',
					'300': '#82c1f7',
					'400': '#40a2f0',
					'500': '#1787e0',
					'600': '#0a69bf',
					'700': '#0a549a',
					'800': '#0d4c87',
					'900': '#103d6a',
					'950': '#0b2646',
				},
			},
		},
	},
	plugins: [],
};
export default config;
