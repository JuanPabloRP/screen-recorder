'use client';

import { useRecordingContext } from '@/context/recordingContext';
import React, { useEffect, useState } from 'react';
import {
	useCameraAndMic,
	useCameraPipMode,
	useRecordingControls,
	useScreenAndAudio,
} from '@/hooks';

const RecordingPreview = () => {
	const { state } = useRecordingContext();

	//const { cameraAndMicRef } = useCameraAndMic();
	//const { screenAndAudioRef } = useScreenAndAudio();
	//const { initializeCameraInPiPMode } = useCameraPipMode();


	const { endRecording, stopRecording, getRecording } = useRecordingControls();

	/* Picture in Picture mode */
/* 	useEffect(() => {
		(async () => {
			if (cameraAndMicRef.current && state.camera.isActive) {
				await initializeCameraInPiPMode();
			}
		})();
	}, []); */

	useEffect(() => {
		if (screenAndAudioRef.current)
			screenAndAudioRef.current.srcObject =
				state.screenAndAudioStream.srcObject;
	}, [screenAndAudioRef, state.screenAndAudioStream]);

/* 	useEffect(() => {
		if (cameraAndMicRef.current)
			cameraAndMicRef.current.srcObject = state.cameraAndMicStream.srcObject;
	}, [cameraAndMicRef, state.cameraAndMicStream]); */

	const handleStopAndGetRecording = () => {
		stopRecording();
		const recording = getRecording();
	
	};

	const handleRecordeAgain = () => {
		endRecording({ download: false });
		// go to home
	};

	return (
		<section>
			{/* <video
						src={recordingVideo}
						autoPlay
						muted
						className="max-w-3xl bg-neutral-900 opacity-50"
						controls
					></video> */}
			<section>
				<p> --- Video grabado --- </p>
			</section>
			<footer className="flex gap-5">
				<button
					className="bg-congress-blue-600 p-2 rounded-md "
					onClick={() => endRecording({ download: false })}
				>
					Volver a grabar
				</button>
				<button
					className="bg-green-600 p-2 rounded-md "
					onClick={() => endRecording({ download: true })}
				>
					Descargar
				</button>
			</footer>
		</section>
	);
};

export default RecordingPreview;
/*
	{ Video recording with  pause, stop and download options  }
			{recordingState === RECORDING_STATE.STOPED ? (
				<section>
					{ <video
						src={recordingVideo}
						autoPlay
						muted
						className="max-w-3xl bg-neutral-900 opacity-50"
						controls
					></video> }
					<footer className="flex gap-5">
						<button
							className="bg-congress-blue-600 p-2 rounded-md "
							onClick={() => endRecording({ download: false })}
						>
							Volver a grabar
						</button>
						<button
							className="bg-green-600 p-2 rounded-md "
							onClick={() => endRecording({ download: true })}
						>
							Descargar
						</button>
					</footer>
				</section>
			) : null}

*/
