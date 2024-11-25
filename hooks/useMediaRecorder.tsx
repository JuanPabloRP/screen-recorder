import { useRef } from 'react';

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

export default useMediaRecorder;
