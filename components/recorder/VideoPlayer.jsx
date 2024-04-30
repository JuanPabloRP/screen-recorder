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
	const [isMuted, setIsMuted] = useState({
		audio: false,
		mic: false,
	});
	const { recording, setRecording } = useRecordingContext();
	const screenRef = useRef({});
	const cameraRef = useRef({});

	useEffect(() => {
		setRecording((prev) => ({
			...prev,
			screenStream: screenStreamRef,
			cameraStream: cameraStreamRef,
		}));
	}, []);

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
		cameraRef.current.srcObject = recording.cameraStream;
	}, [cameraStreamRef]);

	const handleIsMuted = ({ type }) => {
		if (type === 'audio') {
			screenRef.current.muted = !isMuted;
			// silenciar tambien el audio del video
		}

		if (type === 'mic') {
			cameraRef.current.muted = !isMuted;
		}

		setIsMuted({ ...isMuted, [type]: !isMuted[type] });
	};

	return (
		<main className="h-screen w-full flex flex-col items-center  ">
			<header>
				{/* <span className="text-sm font-bold text-left text-gray-500">
					Estado
				</span> */}
				<h1
					className={`text-4xl font-bold ${
						recording.isPaused ? 'text-red-500' : 'text-green-500'
					} `}
				>
					{recording.isPaused ? ' En pausa... 🛑' : '  Grabando... 🎥'}
				</h1>
			</header>

			{/* Video Stream with pause and stop options */}
			<section className=" ">
				{recording.screen ? (
					<video
						ref={screenRef}
						autoPlay
						muted={isMuted['audio']}
						className="max-w-3xl bg-neutral-900 opacity-50"
					></video>
				) : null}

				{recording.camera ? (
					<video
						ref={cameraRef}
						autoPlay
						muted={isMuted['mic']}
						className="max-w-48 bg-neutral-900 absolute right-0 bottom-0 m-5 rounded-md"
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
					<button onClick={() => handleIsMuted({ type: 'audio' })}>
						{isMuted['audio'] ? (
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
									className="icon icon-tabler icons-tabler-outline icon-tabler-volume-3"
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
									className="icon icon-tabler icons-tabler-outline icon-tabler-volume"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M15 8a5 5 0 0 1 0 8" />
									<path d="M17.7 5a9 9 0 0 1 0 14" />
									<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
								</svg>
							</>
						)}
					</button>

					{/* Muted Mic btn */}
					<button onClick={() => handleIsMuted({ type: 'mic' })}>
						{isMuted['mic'] ? (
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
									className="icon icon-tabler icons-tabler-outline icon-tabler-microphone-off"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M3 3l18 18" />
									<path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" />
									<path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" />
									<path d="M8 21l8 0" />
									<path d="M12 17l0 4" />
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
									className="icon icon-tabler icons-tabler-outline icon-tabler-microphone"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
									<path d="M5 10a7 7 0 0 0 14 0" />
									<path d="M8 21l8 0" />
									<path d="M12 17l0 4" />
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
							className="icon icon-tabler icons-tabler-outline icon-tabler-player-stop"
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
