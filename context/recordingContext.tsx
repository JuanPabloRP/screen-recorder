'use client';
import { createContext, useContext, useState } from 'react';

/* type RecordingContextType = {

}
const RecordingContext = createContext<RecordingContextType>(undefined);
*/

const RecordingContext = createContext<any>(undefined);

export function RecordingWrapper({ children }: { children: React.ReactNode }) {
	const [recording, setRecording] = useState({
		video: false,
		audio: true,
		screen: true,
		mic: false,
		fps: 30,
		isRecording: false,
		isPaused: false,
		videoStream: {},
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
