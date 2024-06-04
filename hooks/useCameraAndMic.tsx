import { useCallback, useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';
import { checkDeviceExistence } from '@/utils/helpers';

const useCameraAndMic = () => {
	const { state, dispatch } = useRecordingContext();
	const cameraAndMicRef = useRef({});

	// ARREGLAR: DA ERROR EN useRecording SI SE DESCOMENTA
	// Check if the camera or mic is selected
	/* if (state.camera.isActive || state.mic.isActive) {
		return ;
	}	
 */

	const getCameraAndMicMedia = useCallback(async () => {
		try {
			const isThereACamera = await checkDeviceExistence({ type: 'videoinput' });
			const isThereAMic = await checkDeviceExistence({ type: 'audioinput' });

			const cameraAndMicMedia: MediaStream =
				await navigator.mediaDevices.getUserMedia({
					video: isThereACamera ? { frameRate: { ideal: 60 } } : false,
					audio: isThereAMic ? {} : false,
				});

			if (!cameraAndMicRef.current || !cameraAndMicMedia) {
				return;
			}

			cameraAndMicRef.current = cameraAndMicMedia;
			(cameraAndMicRef.current as any).srcObject = cameraAndMicMedia;

			return cameraAndMicMedia;
		} catch (error) {
			console.log(error);
			return null;
		}
	}, [cameraAndMicRef]);

	const setCameraAndMicStream = useCallback(
		async ({ cameraAndMicMedia }: any) => {
			dispatch({
				type: 'SET_CAMERA_AND_MIC_STREAM',
				payload: {
					cameraAndMicMedia,
					srcObject: (cameraAndMicRef.current as any).srcObject,
				},
			});
		},
		[dispatch, cameraAndMicRef]
	);

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

	// Picture in Picture mode
	const initializeCameraInPiPMode = async () => {
		if (!state.camera.isActive) {
			return;
		}

		const handleCameraPiPMode = async () => {
			try {
				if (document.pictureInPictureElement) {
					document.exitPictureInPicture();
				}

				if (cameraAndMicRef.current) {
					await (cameraAndMicRef.current as any).requestPictureInPicture();
				}
			} catch (error) {
				// Arreglar error TODO - FIX -  NEED TO FIX - NECESITA ARREGLO
				/*
					DOMException: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Must be handling a user gesture if there isn't already an element in Picture-in-Picture.
					at HTMLVideoElement.handleCameraPiPMode
				*/
			}
		};

		if (cameraAndMicRef?.current) {
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
		};
	};

	// this function is used to close the Picture in Picture mode
	const exitCameraInPictureInPicture = async () => {
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		}
	};

	return {
		cameraAndMicRef,
		getCameraAndMicMedia,
		setCameraAndMicStream,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	};
};

export default useCameraAndMic;
