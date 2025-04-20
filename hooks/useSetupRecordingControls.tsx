import { useRecordingContext } from '@/context/recordingContext';
import { ACTIONS } from '@/utils/CONSTANTS';

const useSetupRecordingControls = () => {
	const { state, dispatch } = useRecordingContext();

	const handleRecordingOptions = (e: any) => {
		const { id } = e.target;
		const updatedRecording = {
			id,
			value: { isActive: !state.setupOptions.multimedia[id]?.isActive },
		};

		dispatch({
			type: ACTIONS.SET_MULTIMEDIA,
			payload: updatedRecording,
		});
	};

	const handleSetupRecordingOptions = (e: any, type: any) => {
		/* const { id } = e.target;

		const updatedRecording = {
			isActive: !state[id].isActive,
		};

		dispatch({
			type: ACTIONS[`SET_${id.toUpperCase()}` as keyof typeof ACTIONS],
			payload: updatedRecording,
		});

		return updatedRecording; */
	};

	return {
		handleRecordingOptions,
		handleSetupRecordingOptions,
	};
};

export default useSetupRecordingControls;
