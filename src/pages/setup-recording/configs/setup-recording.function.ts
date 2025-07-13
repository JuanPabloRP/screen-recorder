export const setSetupRecording = ({
	state,
	images: { screen, audio, video, mic },
}: {
	state: any;
	images: {
		screen: string;
		audio: string;
		video: string;
		mic: string;
	};
}) => {
	return [
		{
			id: 'screen',
			title: 'Grabar pantalla',
			isActive: true,
			svg: screen,
			text: 'Pantalla',
		},
		{
			id: 'audio',
			title: 'Grabar audio',
			isActive: state.setupOptions.multimedia.audio?.isActive,
			svg: audio,
			text: 'Audio',
		},
		{
			id: 'camera',
			title: 'Grabar cámara',
			isActive: state.setupOptions.multimedia.camera?.isActive,
			svg: video,
			text: 'Cámara',
		},
		{
			id: 'mic',
			title: 'Grabar micrófono',
			isActive: state.setupOptions.multimedia.mic?.isActive,
			svg: mic,
			text: 'Micrófono',
		},
	];
};
