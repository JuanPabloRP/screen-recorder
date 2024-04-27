'use client';

import { useRecordingContext } from '@/context/recordingContext';
import { useEffect, useRef } from 'react';

/* interface VideoPlayerProps {
	videoStreamRef: MediaStream;
	handleEndRecording: () => void;
	handleContinueRecording: () => void;
	handlePauseRecording: () => void;
} */

const VideoPlayer = ({
	videoStreamRef,
	handleEndRecording,
	handleContinueRecording,
	handlePauseRecording,
}) => {
	const { recording, setRecording } = useRecordingContext();
	const videoRef = useRef({});

	useEffect(() => {
		if (videoRef.current && videoStreamRef) {
			videoRef.current.srcObject = videoStreamRef;
		}
	}, [videoStreamRef]);

	return (
		<main className="h-screen w-full flex flex-col items-center  ">
			<h1 className="text-4xl font-bold ">
				{recording.isPaused ? 'Pausado...' : 'Grabando...'}
			</h1>

			<video ref={videoRef} autoPlay className="w-3/4 bg-neutral-900"></video>

			<section className="flex gap-5 ">
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
				<button
					className='className="mx-auto  text-center text-lg bg-red-500 p-2 rounded-md hover:bg-red-600 focus:bg-red-800 focus:text-congress-blue-100'
					onClick={() => handleEndRecording()}
				>
					Dejar de grabar
				</button>
			</section>
		</main>
	);
};

export default VideoPlayer;
