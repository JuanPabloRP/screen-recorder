import useScreenAndAudio from './useScreenAndAudio';
import useCameraAndMic from './useCameraAndMic';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import useRecordingControls from './useRecordingControls';

const useRecording = () => {
	const { mediaRecorderRef, intializeMediaRecorder, recordedChunks } =
		useMediaRecorder();

	const {
		startRecording,
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
	} = useRecordingControls();

	const { getScreenAndAudioMedia, screenAndAudioRef, setScreenAndAudioStream } =
		useScreenAndAudio();

	const { cameraAndMicRef } = useCameraAndMic();

	return {
		startRecording,
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		intializeMediaRecorder,
		screenAndAudioRef,
		cameraAndMicRef,
		mediaRecorderRef,
		recordedChunks,
		getScreenAndAudioMedia,
		setScreenAndAudioStream,
	};
};

export default useRecording;
