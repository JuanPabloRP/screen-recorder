import { useEffect, useCallback } from 'react';

// Context
import { useRecordingContext } from '../context';

// Constants
import { ACTIONS, RECORDING_STATE } from '../../shared';

// Hooks
import useMediaRecorder from '../hooks/useMediaRecorder';
import useMultimedia from './useMultimedia';

const useRecordingControls = () => {
	const { state, dispatch } = useRecordingContext();

	const { mediaRecorderRef, recordedChunks } = useMediaRecorder();

	const { getMultimedia } = useMultimedia();

	/* useEffect(() => {
		if (state.mediaRecorder) mediaRecorderRef.current = state.mediaRecorder;
		if (state.screenAndAudioStream)
			screenAndAudioRef.current = state.screenAndAudioStream;
		if (state.cameraAndMicStream)
			cameraAndMicRef.current = state.cameraAndMicStream;
	}, [state]); */

	const handleDataAvailable = useCallback(
		(event: BlobEvent) => {
			if (event.data.size > 0) recordedChunks.current.push(event.data);
		},
		[recordedChunks]
	);

	useEffect(() => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.ondataavailable = handleDataAvailable;
		}
	}, [handleDataAvailable]);

	const startRecording = useCallback(async () => {
		try {
			const activeMediaElements = getActiveMultimedia();

			activeMediaElements.forEach(async (media) => {
				const multimedia = await getMultimedia({
					media: state.setupOptions.multimedia[media],
					config: state.config,
					isVideo: media === 'screen' || media === 'camera',
				});

				if (!multimedia) {
					console.error('No se pudo obtener el multimedia:', media);
					return;
				}

				dispatch({
					type: ACTIONS.SET_MULTIMEDIA,
					payload: {
						media,
						multimedia,
					},
				});
			});

			const screenMedia = await getMultimedia({
				isVideo: true,
				media: state.setupOptions.multimedia.screenAndAudio,
				config: {},
			});

			const audioMeida = await getMultimedia({
				isVideo: false,
				media: state.setupOptions.multimedia.screenAndAudio,
				config: {},
			});

			if (!screenMedia?.HTMLMediaElement || !audioMeida?.HTMLMediaElement) {
				console.error('No se pudo obtener la pantalla y/o el audio');
				return;
			}

			/*setScreenAndAudioStream(screenAndAudioMedia);

			if (cameraAndMicMedia && state.camera.isActive) {
				cameraAndMicMedia.getTracks().forEach((track) => {
					screenAndAudioMedia.screenAndAudioRef?.addTrack(track);
				});
				setCameraAndMicStream(cameraAndMicMedia);
			}

			const mediaRecorder = await intializeMediaRecorder({
				mediaStream: screenAndAudioMedia.screenAndAudioRef,
				
			});

				
			mediaRecorder?.start();
				*/
			dispatch({
				type: ACTIONS.START_RECORDING,
				payload: {
					recordingState: RECORDING_STATE.RECORDING,
					mediaRecorder: {},
				},
			});

			console.log(state);
		} catch (error) {
			console.error('Error al iniciar la grabación:', error);
		}
	}, [getMultimedia, state, dispatch]);

	const getActiveMultimedia = () => {
		const multimedia = [];
		if (state.setupOptions.multimedia.screen.isActive)
			multimedia.push('screen');
		if (state.setupOptions.multimedia.audio.isActive) multimedia.push('audio');
		if (state.setupOptions.multimedia.camera.isActive)
			multimedia.push('camera');
		if (state.setupOptions.multimedia.mic.isActive) multimedia.push('mic');

		return multimedia;
	};

	/* 	const stopRecording = useCallback(() => {
		try {
			console.log(screenAndAudioRef, cameraAndMicRef, mediaRecorderRef);
			screenAndAudioRef?.current?.getTracks()?.forEach((track) => track.stop());
			//cameraAndMicRef.current?.getTracks().forEach((track) => track.stop());

			mediaRecorderRef?.current?.stop();

			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
			}

			dispatch({
				type: ACTIONS.STOP_RECORDING,
				payload: {
					...state,
					recordingState: RECORDING_STATE.STOPED,
				},
			});
		} catch (error) {
			console.error('Error al detener la grabación:', error);
		}
	}, [screenAndAudioRef, cameraAndMicRef, mediaRecorderRef, dispatch, state]);

	const getRecording = useCallback(() => {
		try {
			if (!recordedChunks.current.length) {
				throw new Error('No hay grabaciones disponibles');
			}

			const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
			const url = URL.createObjectURL(blob);
			return { url };
		} catch (error) {
			console.error(error);
			return { url: '' };
		}
	}, [recordedChunks]);

	const downloadRecording = useCallback(() => {
		const { url } = getRecording();
		if (!url) return;

		const a = document.createElement('a');
		a.href = url;
		a.download = 'grabacion.webm';
		a.click();
		URL.revokeObjectURL(url);
		recordedChunks.current = [];
	}, [getRecording]);

	const pauseRecording = useCallback(() => {
		mediaRecorderRef.current?.pause();
		dispatch({
			type: ACTIONS.PAUSE_RECORDING,
			payload: { ...state, recordingState: RECORDING_STATE.PAUSED },
		});
	}, [dispatch, state]);

	const continueRecording = useCallback(() => {
		mediaRecorderRef.current?.resume();
		dispatch({
			type: ACTIONS.CONTINUE_RECORDING,
			payload: { ...state, recordingState: RECORDING_STATE.RECORDING },
		});
	}, [dispatch, state]);

	const endRecording = useCallback(
		({ download }: { download: boolean }) => {
			if (download) downloadRecording();
			dispatch({
				type: ACTIONS.END_RECORDING,
				payload: { ...state, recordingState: RECORDING_STATE.INACTIVE },
			});
		},
		[downloadRecording, dispatch, state]
	); */

	return {
		startRecording,
	};
};

export default useRecordingControls;
