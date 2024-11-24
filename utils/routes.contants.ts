export const ROUTES_CONSTANTS = [
	{
		name: 'Inicio',
		path: '/',
		key: 'HOME',
	},
	{
		name: 'Empezar a grabar',
		path: '/setup-recording',
		key: 'SETUP_RECORDING',
	},
	{
		name: 'Grabación',
		path: '/recording',
		key: 'RECORDING',
	},
	{
		name: 'Vista previa',
		path: '/recording-preview',
		key: 'RECORDING_PREVIEW',
	},
];

export const getRouteByKey = (key: string) => {
	const route = ROUTES_CONSTANTS.find((r) => r.key === key);
	return route ? route.path : null;
};
