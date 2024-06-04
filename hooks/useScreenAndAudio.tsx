import { useCallback, useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';

const useScreenAndAudio = () => {
	const { state, dispatch } = useRecordingContext();
	const screenAndAudioRef = useRef({});

	const getScreenAndAudioMedia = useCallback(async () => {
		try {
			const screenAndAudioMedia: MediaStream =
				await navigator.mediaDevices.getDisplayMedia({
					video: state.screen.isActive
						? {
								frameRate: { ideal: state.config.frameRate.value },
								/* width: state.config.resolution.width,
							height: state.config.resolution.height,
               */
						  }
						: false,
					audio: state.audio.isActive ? {} : false,
				});

			if (!screenAndAudioRef.current || !screenAndAudioMedia) {
				return;
			}

			screenAndAudioRef.current = screenAndAudioMedia;
			(screenAndAudioRef.current as any).srcObject = screenAndAudioMedia;

			return screenAndAudioMedia;
		} catch (error) {
			console.log((error as any).message);
			return null;
		}
	}, [state, screenAndAudioRef]);

	const setScreenAndAudioStream = useCallback(
		async ({ screenAndAudioMedia }: any) => {
			dispatch({
				type: 'SET_SCREEN_AND_AUDIO_STREAM',
				payload: {
					screenAndAudioMedia,
					srcObject: (screenAndAudioRef.current as any).srcObject,
				},
			});
		},
		[]
	);

	const setStartRecording = async (updatedRecording: any) => {
		try {
			dispatch({
				type: 'START_RECORDING',
				payload: {
					updatedRecording,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const setEndRecording = async ({ updatedRecording }: any) => {
		try {
			dispatch({
				type: 'END_RECORDING',
				payload: {
					updatedRecording,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const setPauseRecording = async ({ updatedRecording }: any) => {
		try {
			dispatch({
				type: 'PAUSE_RECORDING',
				payload: {
					updatedRecording,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const setContinueRecording = async ({ updatedRecording }: any) => {
		try {
			dispatch({
				type: 'CONTINUE_RECORDING',
				payload: {
					updatedRecording,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getScreenAndAudioMedia,
		screenAndAudioRef,
		setScreenAndAudioStream,
		setStartRecording,
		setEndRecording,
		setPauseRecording,
		setContinueRecording,
	};
};

export default useScreenAndAudio;
