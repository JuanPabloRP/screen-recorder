import { useRef } from 'react';

type InitializeMediaRecorderProps = {
	mediaStream: MediaStream;
	mimeType?: string;
};

const useMediaRecorder = () => {
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const recordedChunks = useRef<Blob[]>([]);

	const intializeMediaRecorder = async ({
		mediaStream,
		mimeType = 'video/webm; codecs=vp9,opus',
	}: InitializeMediaRecorderProps): Promise<MediaRecorder | null> => {
		try {
			if (!MediaRecorder.isTypeSupported(mimeType)) {
				throw new Error(`${mimeType} is not supported on this browser.`);
			}

			const mediaRecorder = new MediaRecorder(mediaStream, { mimeType });
			mediaRecorderRef.current = mediaRecorder;

			mediaRecorder.ondataavailable = (event: BlobEvent) => {
				if (event.data.size > 0) {
					recordedChunks.current.push(event.data);
				}
			};

			console.log('MediaRecorder initialized:', mediaRecorder);
			return mediaRecorder;
		} catch (error) {
			console.error('Error initializing MediaRecorder:', error);
			return null;
		}
	};

	return {
		mediaRecorderRef,
		intializeMediaRecorder,
		recordedChunks,
	};
};

export default useMediaRecorder;
