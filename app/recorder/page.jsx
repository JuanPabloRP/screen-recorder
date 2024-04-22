'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import mic from '@/public/svg/mic.svg';
import video from '@/public/svg/video.svg';
import screen from '@/public/svg/screen.svg';
import audio from '@/public/svg/audio.svg';

const Recorder = () => {
	const [recording, setRecording] = useState({
		video: false,
		audio: true,
		screen: true,
		mic: false,
		fps: 30,
		isRecording: false,
		isPaused: false,
	});

	const mediaRecordingRef = useRef({});
	const mediaRef = useRef({});

	const handleStartRecording = async () => {
		try {
			console.log(mediaRecordingRef.current);

			const media = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: { ideal: recording.fps } },
				audio: recording.audio,
			});

			mediaRef.current = media;

			const mediaRecorder = new MediaRecorder(media, {
				mimeType: 'video/webm; codecs=vp9',
			});

			mediaRecordingRef.current = mediaRecorder;
			mediaRecorder.start();

			console.log(media);
			const updatedRecording = { ...recording, isRecording: true };
			setRecording(updatedRecording);
		} catch (error) {
			//console.error(error);
			setRecording({ ...recording, isRecording: false });
		}
	};

	const handleEndRecording = async () => {
		try {
			handleDownload();
			mediaRef.current?.getTracks().forEach((track) => track.stop());
			console.log(mediaRecordingRef.current);
			if (mediaRecordingRef.current) {
				mediaRecordingRef.current?.stop();
			}
			const updatedRecording = { ...recording, isRecording: false };
			setRecording(updatedRecording);

			//const [video] = await mediaRef.current.getVideoTracks();
		} catch (error) {
			console.log(error);
		}
	};

	const handlePauseRecording = async () => {
		console.log(mediaRecordingRef.current);
		if (mediaRecordingRef.current) {
			mediaRecordingRef.current?.pause();
		}
		const updatedRecording = { ...recording, isPaused: true };
		setRecording(updatedRecording);
	};

	const handleContinueRecording = async () => {
		console.log(mediaRecordingRef.current);

		if (mediaRecordingRef.current) {
			mediaRecordingRef.current?.resume();
		}
		const updatedRecording = { ...recording, isPaused: false };
		setRecording(updatedRecording);
	};

	const handleDownload = async () => {
		try {
			mediaRecordingRef.current.ondataavailable = (event) => {
				const blob = new Blob([event.data], { type: 'video/webm' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				document.body.appendChild(a);
				a.href = url;
				a.download = 'recording.webm';
				a.click();
				window.URL.revokeObjectURL(url);
			};
		} catch (error) {
			console.error(error);
		}
	};

	const handleRecordingOptions = (e, type) => {
		if (type == 'FPSoptions') {
			console.log(e.target.id);
			const { id } = e.target;

			const updatedRecording = { ...recording, fps: id };
			setRecording(updatedRecording);
		}

		if (type == 'recordingOptions') {
			const { id } = e.target;

			const updatedRecording = { ...recording, [id]: !recording[id] };
			setRecording(updatedRecording);
		}
	};

	const btnOptions = {
		recordingOptions: [
			{
				id: 'screen',
				title: 'Grabar pantalla',
				active: recording.screen,
				svg: screen,
			},
			{
				id: 'audio',
				title: 'Grabar audio',
				active: recording.audio,
				svg: audio,
			},
			{
				id: 'video',
				title: 'Grabar cámara',
				active: recording.video,
				svg: video,
			},
			{
				id: 'mic',
				title: 'Grabar micrófono',
				active: recording.mic,
				svg: mic,
			},
		],
		FPSoptions: [
			{
				id: '25',
				title: '25',
				active: recording.fps == 25,
			},
			{
				id: '30',
				title: '30 (Por defecto)',
				active: recording.fps == 30,
			},
			{
				id: '60',
				title: '60',
				active: recording.fps == 60,
			},
		],
	};
	return (
		<main className="min-h-screen flex flex-col justify-center items-center gap-10 ">
			<h1 className="text-4xl font-bold ">¿Que deseas grabar?</h1>
			<ul className="flex gap-5">
				{btnOptions.recordingOptions.map(
					({ id, title, active, svg }, index) => (
						<li
							key={index}
							className={`w-36 h-36 border border-congress-blue-600 rounded-md ${
								active ? 'bg-congress-blue-600' : ''
							}`}
						>
							<button
								id={id}
								className="w-full h-full flex justify-center items-center "
								onClick={(e) => handleRecordingOptions(e, 'recordingOptions')}
							>
								<Image src={svg} alt="svg" className="text-white " />
							</button>
						</li>
					)
				)}
			</ul>

			<h2 className="text-2xl">FPS deseados</h2>
			<ul className="flex justify-between  gap-5">
				{btnOptions.FPSoptions.map(({ id, title, active }, index) => (
					<li
						key={index}
						className={` border border-congress-blue-600 rounded-md  hover:border-congress-blue-900 ${
							active ? 'bg-congress-blue-600' : ''
						}`}
					>
						<button
							id={id}
							className="w-full h-full p-2"
							onClick={(e) => handleRecordingOptions(e, 'FPSoptions')}
						>
							{title}
						</button>
					</li>
				))}
			</ul>

			{!recording.isRecording ? (
				<button
					onClick={() => handleStartRecording()}
					className="mx-auto  text-center text-lg bg-congress-blue-500 p-2 rounded-md hover:bg-congress-blue-600 focus:bg-congress-blue-800 focus:text-congress-blue-100"
				>
					Empezar
				</button>
			) : (
				<>
					<button
						className='className="mx-auto  text-center text-lg bg-red-500 p-2 rounded-md hover:bg-red-600 focus:bg-red-800 focus:text-congress-blue-100'
						onClick={() => handleEndRecording()}
					>
						Dejar de grabar
					</button>
					<section>
						{recording.isPaused ? (
							<button
								onClick={() => handleContinueRecording()}
								className="bg-green-600 p-2 rounded-md"
							>
								Continuar
							</button>
						) : (
							<button
								onClick={() => handlePauseRecording()}
								className="bg-congress-blue-600 p-2 rounded-md"
							>
								Pausar
							</button>
						)}
					</section>
				</>
			)}
		</main>
	);
};

export default Recorder;
