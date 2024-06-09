'use client';
import { useRecordingContext } from '@/context/recordingContext';
import RecordingOptions from '@/components/recorder/RecordingOptions';
import VideoPlayer from '@/components/recorder/VideoPlayer';
import ConfirmationPrompt from '@/components/ConfirmationPrompt';
import { RECORDING_STATE } from '@/utils/CONSTANTS';

const Recorder = () => {
	const { state } = useRecordingContext();
	const { recordingState } = state;

	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			{recordingState === RECORDING_STATE.INACTIVE ? (
				<RecordingOptions />
			) : (
				<VideoPlayer />
			)}
			<ConfirmationPrompt />
		</main>
	);
};

export default Recorder;
