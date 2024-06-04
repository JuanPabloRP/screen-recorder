'use client';
import { useRef, useEffect } from 'react';
import { useRecordingContext } from '@/context/recordingContext';
import RecordingOptions from '@/components/recorder/RecordingOptions';
import VideoPlayer from '@/components/recorder/VideoPlayer';
import ConfirmationPrompt from '@/components/ConfirmationPrompt';
import useRecording from '@/hooks/useRecording';
import { useConfigOptions } from '@/hooks/useRecordingConfig';
import { ACTIONS } from '@/utils/CONSTANTS';

const Recorder = () => {
	const { state, dispatch } = useRecordingContext();
	const {
		startRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		screenAndAudioRef,
		cameraAndMicRef,
	} = useRecording();
	const { recordingOptions, fpsOptions } = useConfigOptions();

	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			{!state.isRecording ? <RecordingOptions /> : <VideoPlayer />}
			<ConfirmationPrompt />

			{/* <video ref={screenAndAudioRef} autoPlay></video> */}
			{/* <video ref={cameraAndMicRef} autoPlay className="max-w-56"></video> */}
		</main>
	);
};

export default Recorder;
