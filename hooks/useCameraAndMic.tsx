import { useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';
import { checkDeviceExistence } from '@/utils/helpers';

const useCameraAndMic = () => {
	const { recording, setRecording } = useRecordingContext();
	const cameraAndMicRef = useRef({});

	// ARREGLAR: DA ERROR EN useRecording SI SE DESCOMENTA
	// Check if the camera or mic is selected
	/* if (!(recording.camera.active || recording.mic.active)) {
		return;
	} */

	const setCameraAndMic = async () => {
		try {
			const isThereACamera = await checkDeviceExistence({ type: 'videoinput' });
			const isThereAMic = await checkDeviceExistence({ type: 'audioinput' });

			const cameraAndMicMedia = await navigator.mediaDevices.getUserMedia({
				video: isThereACamera
					? { frameRate: { ideal: recording.config.frameRate.value } }
					: false,
				audio: isThereAMic ? {} : false,
			});

			if (!cameraAndMicRef.current || !cameraAndMicMedia) {
				return;
			}

			(cameraAndMicRef.current as any).srcObject = cameraAndMicMedia;

			const updatedRecording = {
				...recording,
				camera: {
					active: isThereACamera,
				},
				mic: {
					active: isThereAMic,
				},
				cameraAndMicStream: (cameraAndMicRef.current as any).srcObject,
			};

			setRecording(updatedRecording);
		} catch (error) {
			console.log(error);
		}
	};

	// Picture in Picture mode
	const initializeCameraInPiPMode = () => {
		if (!recording.camera.active) {
			return;
		}

		try {
			if (cameraAndMicRef.current) {
				(cameraAndMicRef.current as any).requestPictureInPicture();
			}
		} catch (error) {
			console.log('Error al entrar al modo de PiP ', error);
		}

		/* if (cameraAndMicRef?.current) {
			cameraAndMicRef.current.addEventListener(
				'loadedmetadata',
				handleCameraPiPMode
			);
		}

		return () => {
			if (cameraAndMicRef.current) {
				cameraAndMicRef.current.removeEventListener(
					'loadedmetadata',
					handleCameraPiPMode
				);
			}
		}; */
	};

	// Picture in Picture mode
	const toggleCameraPiP = () => {
		if (!document.pictureInPictureEnabled) {
			console.log('Error: Picture in Picture is not supported in this browser');

			return;
		}

		try {
			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
				return;
			}

			if (
				cameraAndMicRef.current &&
				(cameraAndMicRef.current as any).srcObject
			) {
				(cameraAndMicRef.current as any).requestPictureInPicture();
			}
		} catch (error) {
			console.log(error);
		}
	};

	// this function is used to close the Picture in Picture mode
	const exitCameraInPictureInPicture = async () => {
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		}
	};

	return {
		cameraAndMicRef,
		setCameraAndMic,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	};
};

export default useCameraAndMic;
