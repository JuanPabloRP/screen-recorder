import { useCallback, useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';

const useScreenAndAudio = () => {
	const { state, dispatch } = useRecordingContext();
	const screenAndAudioRef = useRef<MediaStream>();

	/* Crea el media stream y lo retorna */
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

			if (!screenAndAudioMedia) {
				console.log('No se pudo obtener el stream de pantalla y audio');
				return;
			}

			screenAndAudioRef.current = screenAndAudioMedia;
			(screenAndAudioRef.current as any).srcObject = screenAndAudioMedia;

			return screenAndAudioRef.current;
		} catch (error) {
			console.log((error as any).message);
			return null;
		}
	}, [state, screenAndAudioRef]);

	/* Lo guarda en el context */
	const setScreenAndAudioStream = useCallback(
		async ({ screenAndAudioMedia }: any) => {
			dispatch({
				type: 'SET_SCREEN_AND_AUDIO_STREAM',
				payload: screenAndAudioMedia,
			});
		},
		[]
	);

	return {
		screenAndAudioRef,
		getScreenAndAudioMedia,
		setScreenAndAudioStream,
	};
};

export default useScreenAndAudio;
