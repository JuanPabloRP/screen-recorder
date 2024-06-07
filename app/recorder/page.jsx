'use client';
import { useRecordingContext } from '@/context/recordingContext';
import RecordingOptions from '@/components/recorder/RecordingOptions';
import VideoPlayer from '@/components/recorder/VideoPlayer';
import ConfirmationPrompt from '@/components/ConfirmationPrompt';

const Recorder = () => {
	const { state } = useRecordingContext();
	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			{!state.isRecording ? <RecordingOptions /> : <VideoPlayer />}
			<ConfirmationPrompt />
		</main>
	);
};

export default Recorder;
