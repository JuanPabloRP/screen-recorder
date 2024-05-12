'use client';
import { useState, useRef, useEffect } from 'react';
import { useRecordingContext } from '@/context/recordingContext';
import RecordingOptions from '@/components/recorder/RecordingOptions';
import VideoPlayer from '@/components/recorder/VideoPlayer';
import ConfirmationPrompt from '@/components/ConfirmationPrompt';
import screen from '@/public/svg/screen.svg';
import audio from '@/public/svg/audio.svg';
import video from '@/public/svg/video.svg';
import mic from '@/public/svg/mic.svg';

const Recorder = () => {
	const { recording, setRecording } = useRecordingContext();

	const mediaRecorderRef = useRef({});
	const mediaRef = useRef({});
	const screenStreamRef = useRef({});
	const cameraStreamRef = useRef({});

	useEffect(() => {
		const initialize = async () => {
			try {
				if (
					Object.keys(mediaRecorderRef.current).length === 0 ||
					Object.keys(mediaRef.current).length === 0
				) {
					mediaRef.current = recording.media;
					mediaRecorderRef.current = recording.mediaRecorder;
					screenStreamRef.current.srcObject = recording.screenAndAudioStream;
					cameraStreamRef.current.srcObject = recording.cameraAndMicStream;
				}
			} catch (error) {
				console.log(error);
			}
		};

		initialize();
	}, [recording]);

	const handleStartRecording = async () => {
		try {
			const screenMedia = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: { ideal: recording.config.frameRate.value } },
				audio: recording.audio.active,
			});

			// Check if the camera and mic exist
			const cameraExist = handleCheckDevice('videoinput');
			const micExist = handleCheckDevice('audioinput');

			//If the camera or mic exist, add the media stream to the screen media
			if (recording.camera.active || recording.mic.active) {
				const cameraMedia = await navigator.mediaDevices.getUserMedia({
					video: cameraExist && recording.camera.active,
					audio: micExist && recording.mic.active,
				});

				/* cameraMedia.getTracks().forEach((track) => {
					screenMedia.addTrack(track);
				});
				*/

				cameraStreamRef.current.srcObject = cameraMedia;
			}

			//Set the video stream to the video element
			screenStreamRef.current.srcObject = screenMedia;

			//Reload the video element <- INVESTIGATE WHY THIS IS NECESSARY ksjkjs
			cameraStreamRef.current.srcObject = cameraStreamRef.current.srcObject;
			if (recording.camera.active || recording.mic.active) {
				cameraStreamRef.current.srcObject.getTracks().forEach((track) => {
					screenMedia.addTrack(track);
				});
			}

			//Save the media stream
			mediaRef.current = screenMedia;

			// Create a media recorder
			const mediaRecorder = new MediaRecorder(screenMedia, {
				mimeType: 'video/webm; codecs=vp9',
			});

			//Start recording
			mediaRecorder.start();

			//Save the media recorder
			mediaRecorderRef.current = mediaRecorder;

			//Update the state
			const updatedRecording = {
				...recording,
				isRecording: true,
				isPaused: false,
				mediaRecorder: mediaRecorderRef.current,
				media: mediaRef.current,
				screenAndAudioStream: screenStreamRef.current.srcObject,
				cameraAndMicStream: cameraStreamRef.current.srcObject,
			};
			setRecording(updatedRecording);
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

	const handleCheckDevice = async (type) => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const device = devices.find((device) => device.kind === type);
			return device ? true : false;
			//console.log(device);
		} catch (error) {
			console.log(error);
		}
	};

	const handleRecordingOptions = (e, type) => {
		if (type == 'FPSoptions') {
			//console.log(e.target.id);
			const { id } = e.target;

			const updatedRecording = {
				...recording,
				config: {
					...recording.config,
					frameRate: { ...recording.config.frameRate, value: id },
				},
			};

			setRecording(updatedRecording);
		}

		if (type == 'recordingOptions') {
			const { id } = e.target;

			const updatedRecording = {
				...recording,
				[id]: { ...recording[id], active: !recording[id].active },
			};
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
				text: 'Pantalla',
			},
			{
				id: 'audio',
				title: 'Grabar audio',
				active: recording.audio.active,
				svg: audio,
				text: 'Audio',
			},
			{
				id: 'camera',
				title: 'Grabar cámara',
				active: recording.camera.active,
				svg: video,
				text: 'Cámara',
			},
			{
				id: 'mic',
				title: 'Grabar micrófono',
				active: recording.mic.active,
				svg: mic,
				text: 'Micrófono',
			},
		],
		FPSoptions: [
			{
				id: '25',
				title: '25',
				active: recording.config.frameRate.value == 25,
				disabled: recording.isRecording,
			},
			{
				id: '30',
				title: '30 (Por defecto)',
				active: recording.config.frameRate.value == 30,
				disabled: recording.isRecording,
			},
			{
				id: '60',
				title: '60',
				active: recording.config.frameRate.value == 60,
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
					screenStreamRef={screenStreamRef.current.srcObject}
					cameraStreamRef={cameraStreamRef.current.srcObject}
					handleEndRecording={handleEndRecording}
					handleContinueRecording={handleContinueRecording}
					handlePauseRecording={handlePauseRecording}
					handleDownload={handleDownload}
				/>
			)}
			<ConfirmationPrompt />

			{/* <video ref={screenStreamRef} autoPlay></video> */}

			{/* <video ref={cameraStreamRef} autoPlay className="max-w-56"></video> */}
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

/*
	const handleStartRecording = async () => {
		try {
			const media = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: { ideal: recording.config.frameRate.value } },
				audio: recording.audio,
			});

			const mediaRecorder = new MediaRecorder(media, {
				mimeType: 'video/webm; codecs=vp9',
			});
			//Save the media recorder
			mediaRecorderRef.current = mediaRecorder;
			//Start recording
			mediaRecorder.start();

			//Save the media stream
			mediaRef.current = media;
			//Set the video stream to the video element
			screenStreamRef.current.srcObject = media;

			console.log(screenStreamRef.current.srcObject);

			//Update the state
			const updatedRecording = {
				...recording,
				isRecording: true,
				videoStream: mediaRef.current,
			};
			setRecording(updatedRecording);
			console.log(recording.videoStream);
		} catch (error) {
			console.error(error);
			setRecording({ ...recording, isRecording: false });
		}
	};
	*/
