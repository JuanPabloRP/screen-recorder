'use client';
import { createContext, useContext, useState, useReducer } from 'react';
import { ACTIONS } from '@/utils/CONSTANTS';
/* type RecordingContextType = {

}
const RecordingContext = createContext<RecordingContextType>(undefined);
*/

const initialState = {
	screen: {
		isActive: true,
	},
	audio: {
		isActive: true,
	},
	screenAndAudioStream: {},
	camera: {
		isActive: false,
	},
	mic: {
		isActive: false,
	},
	cameraAndMicStream: {},
	isRecording: false,
	isPaused: false,
	mediaRecorder: {},
	media: {},
	config: {
		resolution: {},
		quality: {},
		codec: {},
		fileType: {
			value: 'video/webm',
		},
		frameRate: {
			value: 30,
		},
		audioBitRate: {},
		videoBitRate: {},
	},
};

const recordingReducer = (state: any, action: any) => {
	switch (action.type) {
		// Setters
		case ACTIONS.SET_RECORDING:
			return { ...state, ...action.payload };
		case ACTIONS.SET_SCREEN_AND_AUDIO_STREAM:
			return { ...state, screenAndAudioStream: action.payload };
		case ACTIONS.SET_CAMERA_AND_MIC_STREAM:
			return { ...state, cameraAndMicStream: action.payload };

		// Recording actions
		case ACTIONS.START_RECORDING:
			const { mediaRecorder, media } = action.payload.updatedRecording;
			return {
				...state,
				isRecording: true,
				isPaused: false,
				mediaRecorder: mediaRecorder,
				media: media,
			};
		case ACTIONS.END_RECORDING:
			return { ...state, isRecording: false };
		case ACTIONS.PAUSE_RECORDING:
			return { ...state, isPaused: true };
		case ACTIONS.CONTINUE_RECORDING:
			return { ...state, isPaused: false };
		// Recording options
		case ACTIONS.SET_SCREEN:
			return { ...state };
		case ACTIONS.SET_AUDIO:
			return { ...state, audio: action.payload };
		case ACTIONS.SET_CAMERA:
			return { ...state, camera: action.payload };
		case ACTIONS.SET_MIC:
			return { ...state, mic: action.payload };

		//
		case ACTIONS.SET_IS_RECORDING:
			return { ...state, isRecording: action.payload };
		case ACTIONS.SET_MEDIA_RECORDER:
			return { ...state, mediaRecorder: action.payload };
		case ACTIONS.SET_MEDIA:
			return { ...state, media: action.payload };
		case ACTIONS.SET_RECORDING_OPTIONS:
			return { ...state };
		case ACTIONS.SET_FRAME_RATE:
			return {
				...state,
				config: {
					...state.config,
					frameRate: {
						value: action.payload,
					},
				},
			};
		default:
			return state;
	}
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
