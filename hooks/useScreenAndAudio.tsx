import { useCallback, useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';

const useScreenAndAudio = () => {
	const { state, dispatch } = useRecordingContext();
	const screenAndAudioRef = useRef<MediaStream | null>(null);
	const screenAndAudioMediaElement = useRef<HTMLMediaElement | null>(null);

	/**
	 * Crea un MediaStream combinando pantalla y audio
	 * @returns El MediaStream obtenido o `null` en caso de error
	 */
	const getScreenAndAudioMedia = useCallback(async () => {
		try {
			const screenAndAudioMedia: MediaStream =
				await navigator.mediaDevices.getDisplayMedia({
					video: state.setupOptions.multimedia.screen.isActive
						? { frameRate: { ideal: state.config.frameRate.value } }
						: false,
					audio: state.setupOptions.multimedia.audio.isActive
						? {
								echoCancellation: true,
								noiseSuppression: true,
								sampleRate: 44100,
						  }
						: false,
				});

			if (!screenAndAudioMedia) {
				console.error('No se pudo obtener el stream de pantalla y audio.');
				return null;
			}

			screenAndAudioRef.current = screenAndAudioMedia;

			// Asigna el stream al elemento media si existe
			if (screenAndAudioMediaElement.current) {
				screenAndAudioMediaElement.current.srcObject = screenAndAudioMedia;
			}

			console.log('Media obtenido:', { screenAndAudioMedia });
			return {
				screenAndAudioRef: screenAndAudioRef.current,
				screenAndAudioMediaElement,
			};
		} catch (error) {
			console.error('Error obteniendo media:', (error as Error).message);
			return null;
		}
	}, [state.setupOptions, state.config.frameRate.value]);

	/**
	 * Guarda el MediaStream en el contexto global
	 * @param screenAndAudioMedia MediaStream a guardar
	 */
	const setScreenAndAudioStream = useCallback(
		(screenAndAudioMedia: MediaStream) => {
			if (!screenAndAudioMedia) {
				console.warn('No se proporcionó un MediaStream válido para guardar.');
				return;
			}

			console.log('Guardando MediaStream en contexto:', {
				screenAndAudioMedia,
			});
			dispatch({
				type: 'SET_SCREEN_AND_AUDIO_STREAM',
				payload: screenAndAudioMedia,
			});
		},
		[dispatch]
	);

	return {
		screenAndAudioRef,
		screenAndAudioMediaElement,
		getScreenAndAudioMedia,
		setScreenAndAudioStream,
	};
};

export default useScreenAndAudio;
