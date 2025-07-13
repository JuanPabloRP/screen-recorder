import useCameraAndMic from '../hooks/useCameraAndMic';
import { useRecordingContext } from '../context';

const useCameraPipMode = () => {
	const { state } = useRecordingContext();
	const { cameraAndMicRef } = useCameraAndMic();

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
		if (!state.setupOptions.multimedia.camera.isActive) {
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
			(cameraAndMicRef.current as any).addEventListener(
				'loadedmetadata',
				handleCameraPiPMode
			);
		}

		return () => {
			if (cameraAndMicRef.current) {
				(cameraAndMicRef.current as any).removeEventListener(
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
		toggleCameraPiP,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
	};
};

export default useCameraPipMode;
