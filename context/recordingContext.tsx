'use client';
import { createContext, useContext, useState } from 'react';

/* type RecordingContextType = {

}
const RecordingContext = createContext<RecordingContextType>(undefined);
*/

const RecordingContext = createContext<any>(undefined);

export function RecordingWrapper({ children }: { children: React.ReactNode }) {
	const [recording, setRecording] = useState({
		screen: {
			active: true,
		},
		audio: {
			active: true,
		},
		screenAndAudioStream: {},
		camera: {
			active: true,
		},
		mic: {
			active: true,
		},
		cameraAndMicStream: {},
		fps: 30,
		isRecording: false,
		isPaused: false,
		mediaRecorder: {},
		media: {},
	});

	return (
		<RecordingContext.Provider
			value={{
				recording,
				setRecording,
			}}
		>
			{children}
		</RecordingContext.Provider>
	);
}

export function useRecordingContext() {
	return useContext(RecordingContext);
}
