'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import mic from '@/public/svg/mic.svg';
import video from '@/public/svg/video.svg';
import screen from '@/public/svg/screen.svg';
import audio from '@/public/svg/audio.svg';
import RecordingOptions from '@/components/recorder/RecordingOptions';
import VideoPlayer from '@/components/recorder/VideoPlayer';
import { useRecordingContext } from '@/context/recordingContext';

const Recorder = () => {
	const { recording, setRecording } = useRecordingContext();

	const mediaRecorderRef = useRef({});
	const mediaRef = useRef({});
	const videoStreamRef = useRef({});

	const handleStartRecording = async () => {
		try {
			const media = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: { ideal: recording.fps } },
				audio: recording.audio,
			});
			//Save the media stream
			mediaRef.current = media;

			const mediaRecorder = new MediaRecorder(media, {
				mimeType: 'video/webm; codecs=vp9',
			});
			//Save the media recorder
			mediaRecorderRef.current = mediaRecorder;
			//Start recording
			mediaRecorder.start();

			//Set the video stream to the video element00
			videoStreamRef.current.srcObject = media;
			console.log(videoStreamRef.current.srcObject);

			//Update the state
			const updatedRecording = {
				...recording,
				isRecording: true,
				videoStream: media,
			};
			setRecording(updatedRecording);
			console.log(recording.videoStream);
		} catch (error) {
			console.error(error);
			setRecording({ ...recording, isRecording: false });
		}
	};

	const handleEndRecording = async () => {
		try {
			handleDownload();

			mediaRef.current?.getTracks().forEach((track) => track.stop());
			//console.log(mediaRecorderRef.current);

			if (mediaRecorderRef.current) {
				mediaRecorderRef.current?.stop();
			}
			const updatedRecording = { ...recording, isRecording: false };
			setRecording(updatedRecording);

			//const [video] = await mediaRef.current.getVideoTracks();
		} catch (error) {
			//console.log(error);
		}
	};

	const handlePauseRecording = async () => {
		//console.log(mediaRecorderRef.current);
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current?.pause();
		}
		const updatedRecording = { ...recording, isPaused: true };
		setRecording(updatedRecording);
	};

	const handleContinueRecording = async () => {
		//console.log(mediaRecorderRef.current);

		if (mediaRecorderRef.current) {
			mediaRecorderRef.current?.resume();
		}
		const updatedRecording = { ...recording, isPaused: false };
		setRecording(updatedRecording);
	};

	const handleDownload = async () => {
		try {
			mediaRecorderRef.current.ondataavailable = (event) => {
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
			//console.log(e.target.id);
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
				active: true,
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
				active: false,
				svg: video,
			},
			{
				id: 'mic',
				title: 'Grabar micrófono',
				active: false,
				svg: mic,
			},
		],
		FPSoptions: [
			{
				id: '25',
				title: '25',
				active: recording.fps == 25,
				disabled: recording.isRecording,
			},
			{
				id: '30',
				title: '30 (Por defecto)',
				active: recording.fps == 30,
				disabled: recording.isRecording,
			},
			{
				id: '60',
				title: '60',
				active: recording.fps == 60,
				disabled: recording.isRecording,
			},
		],
	};
	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			{!recording.isRecording ? (
				<RecordingOptions
					handleStartRecording={handleStartRecording}
					btnOptions={btnOptions}
					handleRecordingOptions={handleRecordingOptions}
				/>
			) : (
				<VideoPlayer
					videoStreamRef={videoStreamRef.current.srcObject}
					handleEndRecording={handleEndRecording}
					handleContinueRecording={handleContinueRecording}
					handlePauseRecording={handlePauseRecording}
				/>
			)}
		</main>
	);
};

export default Recorder;

/* const [recording, setRecording] = useState({
		video: false,
		audio: true,
		screen: true,
		mic: false,
		fps: 30,
		isRecording: false,
		isPaused: false,
		videoStream: {},
	}); */
