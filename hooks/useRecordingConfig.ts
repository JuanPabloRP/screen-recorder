// Description: This file contains the functions that manage the recording configuration.
import { useRecordingContext } from '@/context/recordingContext';
import { useMemo } from 'react';

import screen from '@/public/svg/screen.svg';
import audio from '@/public/svg/audio.svg';
import video from '@/public/svg/video.svg';
import mic from '@/public/svg/mic.svg';

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
				isActive: state.audio?.isActive,
				svg: audio,
				text: 'Audio',
			},
			{
				id: 'camera',
				title: 'Grabar cámara',
				isActive: state.camera?.isActive,
				svg: video,
				text: 'Cámara',
			},
			{
				id: 'mic',
				title: 'Grabar micrófono',
				isActive: state.mic?.isActive,
				svg: mic,
				text: 'Micrófono',
			},
		],
		[state]
	);

	const fpsOptions = [
		{
			id: 25,
			name: '25',
			isActive: state.config?.frameRate.value === 25,
			isDisabled: state.isRecording,
		},
		{
			id: 30,
			name: '30 (Por defecto)',
			isActive: state.config?.frameRate.value === 30,
			isDisabled: state.isRecording,
		},
		{
			id: 60,
			name: '60',
			isActive: state.config?.frameRate.value === 60,
			isDisabled: state.isRecording,
		},
	];

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
		fpsOptions,
		resolutionOptions,
		qualityOptions,
		fileTypeOptions,
	};
};
