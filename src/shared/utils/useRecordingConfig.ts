import { useRecordingContext } from '../../core';
import { useMemo } from 'react';

import screen from '../../assets/svg/screen.svg';
import audio from '../../assets/svg/audio.svg';
import video from '../../assets/svg/video.svg';
import mic from '../../assets/svg/mic.svg';

export const useConfigOptions = () => {
	const { state } = useRecordingContext();

	const recordingOptions = useMemo(
		() => [
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
		],
		[state]
	);

	const resolutionOptions = [
		{
			id: 1,
			name: '720p',
			isActive: state.config.resolution.value === 1,
			isDisabled: state.isRecording,
		},
		{
			id: 2,
			name: '1080p',
			isActive: state.config.resolution.value === 2,
			isDisabled: state.isRecording,
		},
	];

	const qualityOptions = [
		{
			id: 1,
			name: 'Baja',
			isActive: state.config.quality.value === 1,
			isDisabled: state.isRecording,
		},
		{
			id: 2,
			name: 'Media',
			isActive: state.config.quality.value === 2,
			isDisabled: state.isRecording,
		},
		{
			id: 3,
			name: 'Alta',
			isActive: state.config.quality.value === 3,
			isDisabled: state.isRecording,
		},
	];

	const fileTypeOptions = [
		{
			id: 1,
			name: 'webm',
			isActive: state.config.fileType.value === 1,
			isDisabled: state.isRecording,
		},
		{
			id: 2,
			name: 'mp4',
			isActive: state.config.fileType.value === 2,
			isDisabled: state.isRecording,
		},
	];

	return {
		recordingOptions,
		resolutionOptions,
		qualityOptions,
		fileTypeOptions,
	};
};
