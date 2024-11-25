import { useRecordingContext } from '@/context/recordingContext';
import { ACTIONS } from '@/utils/CONSTANTS';

const useSetupRecordingControls = () => {
	const { state, dispatch } = useRecordingContext();

	const handleRecordingOptions = (e: any, type: any) => {
		if (type === 'FPSoptions') {
			const { id } = e.target;

			const updatedRecording = {
				...state,
				config: {
					...state.config,
					frameRate: { ...state.config.frameRate, value: id },
				},
			};

			dispatch({
				type: ACTIONS.SET_FRAME_RATE,
				payload: updatedRecording,
			});
		}

		if (type === 'recordingOptions') {
			const { id } = e.target;

			const updatedRecording = {
				isActive: !state[id].isActive,
			};

			dispatch({
				type: ACTIONS[`SET_${id.toUpperCase()}` as keyof typeof ACTIONS],
				payload: updatedRecording,
			});
		}
	};

	const handleSetupRecordingOptions = (e: any, type: any) => {
		const { id } = e.target;

		const updatedRecording = {
			isActive: !state[id].isActive,
		};

		dispatch({
			type: ACTIONS[`SET_${id.toUpperCase()}` as keyof typeof ACTIONS],
			payload: updatedRecording,
		});

		return updatedRecording;
	};

	return {
		handleRecordingOptions,
		handleSetupRecordingOptions,
	};
};

export default useSetupRecordingControls;
