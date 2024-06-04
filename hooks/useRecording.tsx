import { useEffect, useRef, useCallback } from 'react';
import useScreenAndAudio from './useScreenAndAudio';
import useCameraAndMic from './useCameraAndMic';
import { useRecordingContext } from '@/context/recordingContext';
import { ACTIONS } from '@/utils/CONSTANTS';

const useRecording = () => {
	const { state, dispatch } = useRecordingContext();
	const mediaRecorderRef = useRef();

	const {
		getScreenAndAudioMedia,
		screenAndAudioRef,
		setScreenAndAudioStream,
		setStartRecording,
		setEndRecording,
		setPauseRecording,
		setContinueRecording,
	} = useScreenAndAudio();

	const {
		getCameraAndMicMedia,
		cameraAndMicRef,
		setCameraAndMicStream,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	} = useCameraAndMic();

	useEffect(() => {
		mediaRecorderRef.current = state.mediaRecorder;
	});

	const intializeMediaRecorder = async ({ mediaStream }: any) => {
		try {
			const mediaRecorder = new MediaRecorder(mediaStream, {
				mimeType: 'video/webm; codecs=vp9',
			});

			mediaRecorderRef.current = mediaRecorder;

			//console.log(mediaRecorderRef.current); <- Funca
			return mediaRecorder;
		} catch (error) {
			console.log(error);
		}
	};

	const startRecording = async () => {
		try {
			if (state.camera.isActive || state.mic.isActive) {
			}
			const cameraAndMicMedia = await getCameraAndMicMedia();

			// Se configura la pantalla y el audio
			const screenAndAudioMedia = await getScreenAndAudioMedia();

			if (!screenAndAudioMedia) {
				return;
			}

			// Se guarda la pantalla y el audio en el estado
			setScreenAndAudioStream({ screenAndAudioMedia });

			// Start state the camera and mic
			if (state.camera.isActive || state.mic.isActive) {
				(cameraAndMicRef.current as any).srcObject
					.getTracks()
					.forEach((track: any) => {
						(screenAndAudioRef.current as any).srcObject?.addTrack(track);
					});

				// Se guarda la cámara y el micrófono en el estado
				setCameraAndMicStream({ cameraAndMicMedia });
			}

			const mediaRecorder = await intializeMediaRecorder({
				mediaStream: screenAndAudioMedia,
			});

			//
			if (!mediaRecorderRef.current) return;
			(mediaRecorderRef.current as any)?.start();

			const updatedRecording = {
				isRecording: true,
				isPaused: false,
				mediaRecorder: mediaRecorder,
				media: screenAndAudioRef.current,
			};

			// Se cambia el estado de la grabación
			setStartRecording(updatedRecording);

			//console.log(mediaRecorderRef.current); <- Funca
		} catch (error) {
			console.log(error);
		}
	};

	const download = useCallback(async () => {
		try {
			if (screenAndAudioRef.current?.srcObject) {
				screenAndAudioRef.current.srcObject
					.getTracks()
					.forEach((track) => track.stop());
			}

			if (!mediaRecorderRef.current) {
				throw new Error();
			}

			mediaRecorderRef.current.ondataavailable = (event) => {
				const blob = new Blob([event.data], { type: 'video/webm' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				document.body.appendChild(a);
				a.href = url;
				a.download = 'grabacion.webm';
				a.click();
				window.URL.revokeObjectURL(url);
			};

			return {
				downloaded: true,
			};
		} catch (error) {
			console.error(error);
			return {
				downloaded: false,
			};
		}
	}, [mediaRecorderRef.current]);

	const endRecording = useCallback(async () => {
		try {
			const res = await download();
			console.log(res);

			(screenAndAudioRef.current as any).screenAndAudioMedia
				?.getTracks()
				.forEach((track: any) => track.stop());

			if (mediaRecorderRef.current) {
				(mediaRecorderRef.current as any)?.stop();
			}

			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
			}

			const updatedRecording = {
				...state,
				isRecording: false,
				mediaRecorder: {},
				media: {},
			};

			setEndRecording({ updatedRecording });
		} catch (error) {
			console.log(error);
		}
	}, [
		mediaRecorderRef.current,
		state,
		setEndRecording,
		download,
		screenAndAudioRef,
	]);

	const pauseRecording = async () => {
		console.log(mediaRecorderRef.current);

		if (mediaRecorderRef.current) {
			mediaRecorderRef.current?.pause();
		}
		const updatedRecording = { ...state, isPaused: true };

		setPauseRecording({ updatedRecording });
	};

	const continueRecording = async () => {
		console.log(mediaRecorderRef.current);

		if (mediaRecorderRef.current) {
			mediaRecorderRef.current?.resume();
		}
		const updatedRecording = { ...state, isPaused: false };
		setContinueRecording({ updatedRecording });
	};

	const handleRecordingOptions = (e, type) => {
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
				type: ACTIONS[`SET_${id.toUpperCase()}`],
				payload: updatedRecording,
			});
		}
	};

	return {
		startRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		screenAndAudioRef,
		cameraAndMicRef,
		handleRecordingOptions,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	};
};

export default useRecording;
