'use client';

import { useRecordingContext } from '@/context/recordingContext';
import Link from 'next/link';
import { use, useEffect, useRef, useState } from 'react';

/* interface VideoPlayerProps {
	screenStreamRef: MediaStream;
	handleEndRecording: () => void;
	handleContinueRecording: () => void;
	handlePauseRecording: () => void;
} */

const VideoPlayer = ({
	screenStreamRef,
	cameraStreamRef,
	handleEndRecording,
	handleContinueRecording,
	handlePauseRecording,
	handleDownload,
}) => {
	const [isMuted, setIsMuted] = useState(true);
	const { recording, setRecording } = useRecordingContext();
	const screenRef = useRef({});
	const cameraRef = useRef({});

	useEffect(() => {
		if (screenRef.current && screenStreamRef) {
			screenRef.current.srcObject = screenStreamRef;
			return;
		}
		screenRef.current.srcObject = recording.screenStream;
	}, [screenStreamRef]);

	useEffect(() => {
		if (cameraRef.current && cameraStreamRef) {
			cameraRef.current.srcObject = cameraStreamRef;

			return;
		}
		cameraRef.current.srcObject = cameraStreamRef;
	}, [cameraStreamRef]);

	const handleIsMuted = () => {
		setIsMuted(!isMuted);
		screenRef.current.muted = !isMuted;
	};

	return (
		<main className="h-screen w-full flex flex-col items-center  ">
			<h1 className="text-4xl font-bold ">
				{recording.isPaused ? 'Está en pausa... ✖️' : 'Está grabando... 🎥'}
			</h1>

			{/* Video Stream with pause and stop options */}
			<section className="">
				{recording.screen ? (
					<video
						ref={screenRef}
						autoPlay
						className="max-w-3xl bg-neutral-900 opacity-50"
						muted={isMuted}
					></video>
				) : null}

				{recording.camera ? (
					<video
						ref={cameraRef}
						autoPlay
						className="max-w-32 bg-neutral-900 opacity-50"
					></video>
				) : null}

				<section className="flex gap-5  ">
					{/* Pause and Continue btn */}
					<section>
						{recording.isPaused ? (
							<button
								onClick={() => handleContinueRecording()}
								className="bg-green-600 p-2 rounded-md"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="icon icon-tabler icons-tabler-outline icon-tabler-player-play"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M7 4v16l13 -8z" />
								</svg>
							</button>
						) : (
							<button
								onClick={() => handlePauseRecording()}
								className="bg-congress-blue-600 p-2 rounded-md"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="icon icon-tabler icons-tabler-outline icon-tabler-player-pause"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
									<path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
								</svg>
							</button>
						)}
					</section>

					{/* Muted btn */}
					<button onClick={() => handleIsMuted()}>
						{isMuted ? (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="icon icon-tabler icons-tabler-outline icon-tabler-volume-3"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
									<path d="M16 10l4 4m0 -4l-4 4" />
								</svg>
							</>
						) : (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="icon icon-tabler icons-tabler-outline icon-tabler-volume"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M15 8a5 5 0 0 1 0 8" />
									<path d="M17.7 5a9 9 0 0 1 0 14" />
									<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
								</svg>
							</>
						)}
					</button>

					{/* Stop and Download btn */}
					<button
						className='className="mx-auto  text-center text-lg bg-red-500 p-2 rounded-md hover:bg-red-600 focus:bg-red-800 focus:text-congress-blue-100'
						onClick={() => handleEndRecording()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="icon icon-tabler icons-tabler-outline icon-tabler-player-stop"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 5m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
						</svg>
					</button>
				</section>
			</section>
		</main>
	);
};

export default VideoPlayer;

//
/* useEffect(() => {
		if (recording.isPaused) {
			setIsMuted(true);
			screenRef.current.muted = true;
		}
	}, [recording.isMuted, recording.isPaused, isMuted]); */
