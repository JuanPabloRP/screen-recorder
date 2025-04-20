'use client';
import { createContext, useContext, useState, useReducer } from 'react';
import { ACTIONS, RECORDING_STATE } from '@/utils/CONSTANTS';

interface RecordingStateType {
	recordingState: string;
	setupOptions: {
		multimedia: {
			screen: {
				isActive: boolean;
			};
			audio: {
				isActive: boolean;
			};
			camera: {
				isActive: boolean;
			};
			mic: {
				isActive: boolean;
			};
		};
	};
	multimediaSteams: {
		screen: any;
		audio: any;
		camera: any;
		mic: any;
	};
	mediaRecorder: any;
	config: {
		resolution: any;
		quality: any;
		fileType: {
			value: string;
		};
		frameRate: {
			value: number;
		};
	};
}

const initialState: RecordingStateType = {
	recordingState: RECORDING_STATE.INACTIVE,
	setupOptions: {
		multimedia: {
			screen: {
				isActive: true,
			},
			audio: {
				isActive: true,
			},
			camera: {
				isActive: false,
			},
			mic: {
				isActive: false,
			},
		},
	},
	multimediaSteams: {
		screen: {},
		audio: {},
		camera: {},
		mic: {},
	},
	mediaRecorder: {},
	config: {
		resolution: {},
		quality: {},
		fileType: {
			value: 'video/webm',
		},
		frameRate: {
			value: 30,
		},
	},
};

const recordingReducer = (state: any, action: any) => {
	const { type, payload } = action;
	const { id, value } = payload;

	console.log({ type, payload, state });

	const handlers: Record<string, (state: any) => any> = {
		// Setters
		[ACTIONS.SET_SCREEN_AND_AUDIO_STREAM]: () => ({
			...state,
			screenAndAudioStream: payload,
		}),
		[ACTIONS.SET_CAMERA_AND_MIC_STREAM]: () => ({
			...state,
			cameraAndMicStream: payload,
		}),

		// Recording actions
		[ACTIONS.SET_RECORDING_STATE]: () => ({
			...state,
			recordingState: payload,
			multimediaSteams: {
				...state.multimediaSteams,
				...payload.multimediaSteams,
			},
			mediaRecorder: payload.mediaRecorder,
		}),
		[ACTIONS.START_RECORDING]: () => ({
			...state,
			recordingState: RECORDING_STATE.RECORDING,
			mediaRecorder: payload.mediaRecorder,
		}),
		[ACTIONS.STOP_RECORDING]: () => ({
			...state,
			recordingState: RECORDING_STATE.STOPED,
			mediaRecorder: {},
		}),
		[ACTIONS.END_RECORDING]: () => ({
			...state,
			recordingState: RECORDING_STATE.INACTIVE,
			mediaRecorder: {},
		}),
		[ACTIONS.PAUSE_RECORDING]: () => ({
			...state,
			recordingState: RECORDING_STATE.PAUSED,
		}),
		[ACTIONS.CONTINUE_RECORDING]: () => ({
			...state,
			recordingState: RECORDING_STATE.RECORDING,
		}),

		// Recording options
		[ACTIONS.SET_MULTIMEDIA]: () => ({
			...state,
			setupOptions: {
				multimedia: { ...state.setupOptions.multimedia, [id]: value },
			},
		}),

		// Configurations
		[ACTIONS.SET_CONFIG]: () => ({
			...state,
			config: {
				...state.config,
				resolution: { value: payload },
			},
		}),

		// Media recorder and configurations
		[ACTIONS.SET_MEDIA_RECORDER]: () => ({ ...state, mediaRecorder: payload }),
		[ACTIONS.SET_RECORDING_OPTIONS]: () => state, // No changes, kept for completeness
		[ACTIONS.SET_FRAME_RATE]: () => ({
			...state,
			config: {
				...state.config,
				frameRate: { value: payload },
			},
		}),
	};

	// Return the result of the handler if it exists, otherwise the current state
	return handlers[type] ? handlers[type](state) : state;
};

const RecordingContext = createContext<any>(undefined);

export function RecordingWrapper({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(recordingReducer, initialState);

	return (
		<RecordingContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</RecordingContext.Provider>
	);
}

export function useRecordingContext() {
	return useContext(RecordingContext);
}
