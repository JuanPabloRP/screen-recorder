'use client';

import { useRecordingContext } from '@/context/recordingContext';
import useRecording from '@/hooks/useRecording';
import React, { useEffect, useState } from 'react';

const RecordingPreview = () => {
	const { state } = useRecordingContext();
	const { recordingState } = state;

	const {
		stopRecording,
		endRecording,
		pauseRecording,
		continueRecording,
		downloadRecording,
		getRecording,
		screenAndAudioRef,
		cameraAndMicRef,
		mediaRecorderRef,
		recordedChunks,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	} = useRecording();

	const [recordingVideo, setRecordingVideo] = useState(null);

	/* Picture in Picture mode */
	useEffect(() => {
		(async () => {
			if (cameraAndMicRef.current && state.camera.isActive) {
				await initializeCameraInPiPMode();
			}
		})();
	}, []);

	useEffect(() => {
		if (screenAndAudioRef.current)
			screenAndAudioRef.current.srcObject =
				state.screenAndAudioStream.srcObject;
	}, [screenAndAudioRef, state.screenAndAudioStream]);

	useEffect(() => {
		if (cameraAndMicRef.current)
			cameraAndMicRef.current.srcObject = state.cameraAndMicStream.srcObject;
	}, [cameraAndMicRef, state.cameraAndMicStream]);
	/*
	const handleStopAndGetRecording = () => {
		stopRecording();
		const recording = getRecording();
		setRecordingVideo(recording.url);
	};
*/
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
