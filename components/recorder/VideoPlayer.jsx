'use client';

import { useRecordingContext } from '@/context/recordingContext';
import useRecording from '@/hooks/useRecording';
import { useEffect, useRef, useState } from 'react';
import { RECORDING_STATE } from '@/utils/CONSTANTS';

const VideoPlayer = ({}) => {
	const { state, dispatch } = useRecordingContext();
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

	const handleStopAndGetRecording = () => {
		stopRecording();
		const recording = getRecording();
		setRecordingVideo(recording.url);
	};

	console.log(recordingVideo);

	return (
		<main className="h-screen w-full flex flex-col items-center  ">
			<header>
				<h1
					className={`text-4xl font-bold ${
						recordingState === RECORDING_STATE.PAUSED
							? 'text-red-500'
							: 'text-green-500'
					} `}
				>
					{recordingState === RECORDING_STATE.PAUSED
						? ' En pausa... 🛑'
						: recordingState === RECORDING_STATE.STOPED
						? 'Grabación... ✅'
						: '  Grabando... 🎥'}
				</h1>
			</header>

			{/* Video Stream with pause and stop options */}
			{recordingState === RECORDING_STATE.RECORDING ||
			recordingState === RECORDING_STATE.PAUSED ? (
				<section className=" ">
					{/* Screen video stream */}
					{state.screen.isActive ? (
						<video
							ref={screenAndAudioRef}
							autoPlay
							muted
							className="max-w-3xl bg-neutral-900 opacity-50"
						></video>
					) : null}

					{/* Camera video stream */}
					{state.camera.isActive ? (
						<section className="max-w-52 bg-neutral-900 absolute right-0 bottom-0 m-5 rounded-md">
							<video ref={cameraAndMicRef} autoPlay muted></video>
							<button onClick={() => toggleCameraPiP()}>Cambiar modo</button>
						</section>
					) : null}

					{/* Options */}
					<section className="flex gap-5  ">
						{/* Pause and Continue btn */}
						<section>
							{recordingState === RECORDING_STATE.PAUSED ? (
								<button
									onClick={continueRecording}
									className="bg-green-600 p-2 rounded-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="icon icon-tabler icons-tabler-outline icon-tabler-player-play"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M7 4v16l13 -8z" />
									</svg>
								</button>
							) : (
								<button
									onClick={pauseRecording}
									className="bg-congress-blue-600 p-2 rounded-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
										<path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
									</svg>
								</button>
							)}
						</section>

						{/* Stop and Download btn */}
						<button
							className='className="mx-auto  text-center text-lg bg-red-500 p-2 rounded-md hover:bg-red-600 focus:bg-red-800 focus:text-congress-blue-100'
							onClick={handleStopAndGetRecording}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="icon icon-tabler icons-tabler-outline icon-tabler-player-stop"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 5m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
							</svg>
						</button>
					</section>
				</section>
			) : null}

			{/* Video recording with  pause, stop and download options  */}
			{recordingState === RECORDING_STATE.STOPED ? (
				<section>
					{/* <video
						src={recordingVideo}
						autoPlay
						muted
						className="max-w-3xl bg-neutral-900 opacity-50"
						controls
					></video> */}
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
		</main>
	);
};

export default VideoPlayer;
