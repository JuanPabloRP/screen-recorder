import { useRef } from 'react';
import { useRecordingContext } from '@/context/recordingContext';

const useScreenAndAudio = () => {
	const { recording, setRecording } = useRecordingContext();
	const screenAndAudioRef = useRef({});

	const setScreenAndAudio = async () => {
		try {
			const screenAndAudioMedia = await navigator.mediaDevices.getDisplayMedia({
				video: recording.screen.active
					? {
							frameRate: { ideal: recording.config.frameRate.value },
							/* width: recording.config.resolution.width,
							height: recording.config.resolution.height,
               */
					  }
					: false,
				audio: recording.audio.active
					? {
							echoCancellation: true,
							noiseSuppression: true,
							sampleRate: 44100,
							sampleSize: 16,
							channelCount: 2,
					  }
					: false,
			});

			if (screenAndAudioRef.current || !screenAndAudioMedia) {
				return;
			}

			(screenAndAudioRef.current as any).srcObject = screenAndAudioMedia;

			const updatedRecording = {
				...recording,
				screenAndAudioStream: (screenAndAudioRef.current as any).srcObject,
			};

			setRecording(updatedRecording);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		screenAndAudioRef,
		setScreenAndAudio,
	};
};

export default useScreenAndAudio;
