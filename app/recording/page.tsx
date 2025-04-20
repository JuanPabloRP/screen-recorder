'use client';

import { useRecordingContext } from '@/context/recordingContext';
import {
	useRecordingControls,
	useCameraPipMode,
	useMediaRecorder,
	useCameraAndMic,
	useScreenAndAudio,
} from '@/hooks';

import { RECORDING_STATE } from '@/utils/CONSTANTS';
import { useEffect, useState } from 'react';

const Recording = () => {
	const { state } = useRecordingContext();
	const { recordingState } = state;

	const { screenAndAudioRef, screenAndAudioMediaElement } = useScreenAndAudio();

	//const { cameraAndMicRef } = useCameraAndMic();

	const { stopRecording, pauseRecording, continueRecording, getRecording } =
		useRecordingControls();

	/* const {
		toggleCameraPiP,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
	} = useCameraPipMode();
	const [recordingVideo, setRecordingVideo] = useState(null); */

	/* Picture in Picture mode */
	/* 	useEffect(() => {
		(async () => {
			if (cameraAndMicRef.current && state.camera.isActive) {
				await initializeCameraInPiPMode();
			}
		})();
	}, []); */

	useEffect(() => {
		if (screenAndAudioMediaElement.current)
			screenAndAudioMediaElement.current.srcObject =
				state.screenAndAudioStream.srcObject;
	}, [screenAndAudioRef, state.screenAndAudioStream]);

	/* 	useEffect(() => {
		if (cameraAndMicRef.current)
			cameraAndMicRef.current.srcObject = state.cameraAndMicStream.srcObject;
	}, [cameraAndMicRef, state.cameraAndMicStream]); */

	const goToRecordingPreview = () => {
		stopRecording();
		const recording = getRecording();
		console.log(recording);

	};

	if (
		recordingState === RECORDING_STATE.INACTIVE ||
		recordingState === RECORDING_STATE.STOPED
	) {
		return (
			<section>
				<h1>No se está grabando</h1>
			</section>
		);
	}

	return (
		<main className=" w-full flex flex-col items-center  ">
			<header>
				<h1
					className={`text-4xl font-bold ${
						recordingState === RECORDING_STATE.PAUSED
							? 'text-red-500'
							: 'text-blue-500'
					} `}
				>
					{recordingState === RECORDING_STATE.PAUSED
						? ' En pausa... 🛑'
						: '  Grabando... 🎥'}
				</h1>
			</header>

			{recordingState === RECORDING_STATE.RECORDING ||
			recordingState === RECORDING_STATE.PAUSED ? (
				<section className=" ">
					{/* Screen video stream */}
					{state.setupOptions.multimedia.screen.isActive ? (
						<video
							ref={screenAndAudioMediaElement.current?.srcObject}
							autoPlay
							muted
							className="max-w-3xl bg-neutral-900 opacity-50"
						></video>
					) : null}

					{/* Camera video stream */}
					{/* {state.setupOptions.multimedia.camera.isActive ? (
						<section className="max-w-52 bg-neutral-900 absolute right-0 bottom-0 m-5 rounded-md">
							<video ref={cameraAndMicRef} autoPlay muted></video>
							<button onClick={() => toggleCameraPiP()}>Cambiar modo</button>
						</section>
					) : null} */}

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

						{/* Stop btn */}
						<button
							className='className="mx-auto  text-center text-lg bg-red-500 p-2 rounded-md hover:bg-red-600 focus:bg-red-800 focus:text-congress-blue-100'
							onClick={goToRecordingPreview}
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
		</main>
	);
};

export default Recording;
