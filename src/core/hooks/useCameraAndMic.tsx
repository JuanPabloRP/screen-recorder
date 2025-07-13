import { useCallback, useRef } from 'react';
import { useRecordingContext } from '../context';
import { DeviceEnum, useDevices } from './useDevices';

const useCameraAndMic = () => {
	const { dispatch } = useRecordingContext();
	const cameraAndMicRef = useRef({});

	const { getInputDevices } = useDevices();

	const getCameraAndMicMedia = useCallback(async () => {
		try {
			const [idCamera, idMic] = await Promise.all([
				getInputDevices({ type: DeviceEnum.AudioInput }),
				getInputDevices({ type: DeviceEnum.VideoInput }),
			]);

			const cameraAndMicMedia: MediaStream =
				await navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: idCamera ? { exact: idCamera } : undefined,
						frameRate: idCamera ? { ideal: 60 } : undefined,
					},
					audio: idMic ? { deviceId: { exact: idMic } } : undefined,
				});

			if (!cameraAndMicRef.current || !cameraAndMicMedia) {
				return;
			}

			cameraAndMicRef.current = cameraAndMicMedia;
			(cameraAndMicRef.current as any).srcObject = cameraAndMicMedia;

			return 'CAMBIOS EN ESTE HOOK';
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

	return {
		cameraAndMicRef,
		getCameraAndMicMedia,
		setCameraAndMicStream,
	};
};

export default useCameraAndMic;
