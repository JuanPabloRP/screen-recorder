import { useEffect, useRef, useCallback } from 'react';
import useScreenAndAudio from './useScreenAndAudio';
import useCameraAndMic from './useCameraAndMic';
import { useRecordingContext } from '@/context/recordingContext';
import { ACTIONS, RECORDING_STATE } from '@/utils/CONSTANTS';

type RecordingState = {
	type: string;
	payload: object;
};

const useRecordingState = () => {
	const { state, dispatch } = useRecordingContext();

	const setStateRecording = async ({ type, payload }: RecordingState) => {
		try {
			dispatch({
				type,
				payload,
			});

			return state;
		} catch (error: any) {
			console.log(error);
			throw new Error(error);
		}
	};

	return { state, setStateRecording };
};

const useMediaRecorder = () => {
	const mediaRecorderRef = useRef<MediaRecorder>();
	const recordedChunks = useRef<any>([]);

	const intializeMediaRecorder = async ({ mediaStream }: any) => {
		try {
			const mediaRecorder = new MediaRecorder(mediaStream, {
				mimeType: 'video/webm; codecs=vp9,opus',
			});

			(mediaRecorderRef.current as any) = mediaRecorder;

			mediaRecorder.ondataavailable = (event: any) => {
				if (event.data.size > 0) {
					recordedChunks.current.push(event.data);
				}
			};

			return mediaRecorder;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		mediaRecorderRef,
		intializeMediaRecorder,
		recordedChunks,
	};
};

const useRecordingControls = () => {
	const { dispatch } = useRecordingContext();
	const { state, setStateRecording } = useRecordingState();
	const { mediaRecorderRef, intializeMediaRecorder, recordedChunks } =
		useMediaRecorder();
	const { getScreenAndAudioMedia, screenAndAudioRef, setScreenAndAudioStream } =
		useScreenAndAudio();
	const {
		getCameraAndMicMedia,
		cameraAndMicRef,
		setCameraAndMicStream,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
		getCameraDevices,
		getMicDevices,
	} = useCameraAndMic();

	/* ---- Lógica ---- */
	// Initializa el media recorder
	useEffect(() => {
		mediaRecorderRef.current = state.mediaRecorder;
		screenAndAudioRef.current = state.screenAndAudioStream;
		cameraAndMicRef.current = state.cameraAndMicStream;
	});

	useEffect(() => {
		(mediaRecorderRef.current as any).ondataavailable = (event: any) => {
			if (event.data.size > 0) {
				recordedChunks.current.push(event.data);
			}
		};
	});

	// Inicia la grabación
	const startRecording = async () => {
		try {
			let cameraAndMicMedia;
			if (state.camera.isActive || state.mic.isActive) {
				cameraAndMicMedia = await getCameraAndMicMedia();
			}

			// Se configura la pantalla y el audio
			const screenAndAudioMedia = await getScreenAndAudioMedia();

			// Siempre se graba minimo la pantalla
			if (!screenAndAudioMedia) {
				console.log('No se pudo obtener la pantalla y/o el audio');
				return;
			}
			// Se guarda la pantalla y/o el audio en el estado
			setScreenAndAudioStream({ screenAndAudioMedia });

			// Si se eligio la camara o mic se le agrega a la pista de la grabacion de pantalla
			if (state.camera.isActive || state.mic.isActive) {
				(cameraAndMicRef.current as any).srcObject
					.getTracks()
					.forEach((track: any) => {
						(screenAndAudioRef.current as any).srcObject?.addTrack(track);
					});

				// Se guarda la cámara y/o el micrófono en el estado
				setCameraAndMicStream({ cameraAndMicMedia });
			}

			const mediaRecorder = await intializeMediaRecorder({
				mediaStream: screenAndAudioMedia,
			});

			if (!mediaRecorderRef.current) {
				console.log('No se pudo obtener el mediaRecorder');
				return;
			}

			(mediaRecorderRef.current as any)?.start();

			const updatedRecording = {
				recordingState: RECORDING_STATE.RECORDING,
				mediaRecorder: mediaRecorder,
			};

			// Se cambia el estado de la grabación
			setStateRecording({
				type: ACTIONS.START_RECORDING,
				payload: updatedRecording,
			});

			//console.log(mediaRecorderRef.current); <- Funca
		} catch (error) {
			console.log(error);
		}
	};

	//
	const pauseRecording = async () => {
		console.log(mediaRecorderRef.current);

		if (mediaRecorderRef.current) {
			(mediaRecorderRef.current as any).pause();
		}
		const updatedRecording = {
			...state,
			recordingState: RECORDING_STATE.PAUSED,
		};

		setStateRecording({
			type: ACTIONS.PAUSE_RECORDING,
			payload: updatedRecording,
		});
	};

	const continueRecording = async () => {
		console.log(mediaRecorderRef.current);

		if (mediaRecorderRef.current) {
			(mediaRecorderRef.current as any).resume();
		}
		const updatedRecording = {
			...state,
			recordingState: RECORDING_STATE.RECORDING,
		};
		setStateRecording({
			type: ACTIONS.CONTINUE_RECORDING,
			payload: updatedRecording,
		});
	};

	const getRecording = () => {
		try {
			if (!mediaRecorderRef.current) {
				throw new Error();
			}
			console.log(recordedChunks.current);
			const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
			const url = URL.createObjectURL(blob);
			console.log(url);

			return {
				url,
			};
		} catch (error: any) {
			console.log(error.message);
			return {
				url: '',
			};
		}
	};

	const downloadRecording = () => {
		try {
			const { url } = getRecording();
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.href = url;
			a.download = 'grabacion.webm';
			a.click();
			window.URL.revokeObjectURL(url);
			recordedChunks.current = [];

			return {
				url,
				downloaded: true,
			};
		} catch (error) {
			console.error(error);
			return {
				downloaded: false,
			};
		}
	};

	const stopRecording = () => {
		try {
			// Parar grabación de pantalla
			console.log(screenAndAudioRef.current);
			(screenAndAudioRef.current as any).srcObject
				?.getTracks()
				?.forEach((track: any) => track?.stop());

			console.log(cameraAndMicRef.current);
			// Para grabación cámara
			(cameraAndMicRef.current as any).srcObject
				?.getTracks()
				?.forEach((track: any) => track?.stop());

			//
			if (mediaRecorderRef.current) {
				(mediaRecorderRef.current as any)?.stop();
			}

			// Si la cámara esta en modo Picture in Picture se sale
			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
			}

			const updatedRecording = {
				...state,
				recordingState: RECORDING_STATE.STOPED,
			};

			setStateRecording({
				type: ACTIONS.STOP_RECORDING,
				payload: updatedRecording,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const endRecording = async ({ download }: any) => {
		if (download) {
			downloadRecording();
		}

		/*
		(screenAndAudioRef.current as any).srcObject
			?.getTracks()
			?.forEach((track: any) => track?.stop());

		// Para grabación cámara
		(cameraAndMicRef.current as any).srcObject
			?.getTracks()
			?.forEach((track: any) => track?.stop());

		if (mediaRecorderRef.current) {
			(mediaRecorderRef.current as any).stop();
		}
		*/
		const updatedRecording = {
			...state,
			recordingState: RECORDING_STATE.INACTIVE,
		};

		setStateRecording({
			type: ACTIONS.END_RECORDING,
			payload: updatedRecording,
		});
	};

	const handleRecordingOptions = (e: any, type: any) => {
		if (type === 'FPSoptions') {
			const { id } = e.target;

			const updatedRecording = {
				...state,
				config: {
					...state.config,
					frameRate: { ...state.config.frameRate, value: id },
				},
			};

			dispatch({
				type: ACTIONS.SET_FRAME_RATE,
				payload: updatedRecording,
			});
		}

		if (type === 'recordingOptions') {
			const { id } = e.target;

			const updatedRecording = {
				isActive: !state[id].isActive,
			};

			dispatch({
				type: ACTIONS[`SET_${id.toUpperCase()}` as keyof typeof ACTIONS],
				payload: updatedRecording,
			});
		}
	};

	return {
		startRecording,
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		downloadRecording,
		getRecording,
		handleRecordingOptions,
	};
};

const useRecording = () => {
	const { setStateRecording } = useRecordingState();
	const { mediaRecorderRef, intializeMediaRecorder, recordedChunks } =
		useMediaRecorder();
	const {
		startRecording,
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		downloadRecording,
		getRecording,
		handleRecordingOptions,
	} = useRecordingControls();
	const { getScreenAndAudioMedia, screenAndAudioRef, setScreenAndAudioStream } =
		useScreenAndAudio();
	const {
		getCameraAndMicMedia,
		cameraAndMicRef,
		setCameraAndMicStream,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
		getCameraDevices,
		getMicDevices,
	} = useCameraAndMic();

	return {
		startRecording,
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		downloadRecording,
		getRecording,
		handleRecordingOptions,
		screenAndAudioRef,
		cameraAndMicRef,
		mediaRecorderRef,
		recordedChunks,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
		setStateRecording,
	};
};

export default useRecording;
