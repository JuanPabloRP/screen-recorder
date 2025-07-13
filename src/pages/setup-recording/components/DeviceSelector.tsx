'use client';

import { useEffect, useState } from 'react';

interface MediaDevice {
	deviceId: string;
	label: string;
}

export default function DeviceSelector() {
	const [audioDevices, setAudioDevices] = useState<MediaDevice[]>([]);
	const [videoDevices, setVideoDevices] = useState<MediaDevice[]>([]);
	const [selectedAudio, setSelectedAudio] = useState<string>('');
	const [selectedVideo, setSelectedVideo] = useState<string>('');
	const [permissionError, setPermissionError] = useState<string>('');

	useEffect(() => {
		const getDevices = async () => {
			try {
				// Request permissions first
				await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

				const devices = await navigator.mediaDevices.enumerateDevices();

				const audioInputs = devices
					.filter((device) => device.kind === 'audioinput')
					.map((device) => ({
						deviceId: device.deviceId,
						label:
							device.label || `Micrófono ${device.deviceId.slice(0, 5)}...`,
					}));

				const videoInputs = devices
					.filter((device) => device.kind === 'videoinput')
					.map((device) => ({
						deviceId: device.deviceId,
						label: device.label || `Cámara ${device.deviceId.slice(0, 5)}...`,
					}));

				setAudioDevices(audioInputs);
				setVideoDevices(videoInputs);

				if (audioInputs.length) setSelectedAudio(audioInputs[0].deviceId);
				if (videoInputs.length) setSelectedVideo(videoInputs[0].deviceId);
			} catch (error) {
				setPermissionError('Se requieren permisos de cámara y micrófono');
				console.error('Error accessing media devices:', error);
			}
		};

		getDevices();

		// Listen for device changes
		navigator.mediaDevices.addEventListener('devicechange', getDevices);

		return () => {
			navigator.mediaDevices.removeEventListener('devicechange', getDevices);
		};
	}, []);

	const handleSubmit = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: selectedAudio ? { deviceId: { exact: selectedAudio } } : false,
				video: selectedVideo ? { deviceId: { exact: selectedVideo } } : false,
			});

			// Here you would handle the stream (e.g., pass it to a recording function)

		} catch (error) {
			console.error('Error accessing selected devices:', error);
			setPermissionError('Error al acceder a los dispositivos seleccionados');
		}
	};

	if (permissionError) {
		return (
			<section className="w-full max-w-md mx-auto">
				<header>
					<h1 className="text-red-500">Error de Permisos</h1>
				</header>
				<section>
					<p>{permissionError}</p>
				</section>
			</section>
		);
	}

	return (
		<section className="w-full max-w-md mx-auto">
			<header>
				<h1>Seleccionar Dispositivos</h1>
				<p>Elige los dispositivos que deseas utilizar para la grabación</p>
			</header>
			<section className="space-y-4">
				<div className="space-y-2">
					<label className="text-sm font-medium flex items-center gap-2">
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
							className="icon icon-tabler icons-tabler-outline icon-tabler-microphone"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
							<path d="M5 10a7 7 0 0 0 14 0" />
							<path d="M8 21l8 0" />
							<path d="M12 17l0 4" />
						</svg>
						Micrófono
					</label>
					<select
						value={selectedAudio}
						onChange={(e) => setSelectedAudio(e.target.value)}
						className="border border-gray-300 rounded-md p-2 w-full"
					>
						<option value="" disabled>
							Seleccionar micrófono
						</option>
						{audioDevices.map((device) => (
							<option key={device.deviceId} value={device.deviceId}>
								{device.label}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium flex items-center gap-2">
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
							className="icon icon-tabler icons-tabler-outline icon-tabler-camera"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
							<path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
						</svg>
						Cámara
					</label>
					<select
						value={selectedVideo}
						onChange={(e) => setSelectedVideo(e.target.value)}
						className="border border-gray-300 rounded-md p-2 w-full"
					>
						<option value="" disabled>
							Seleccionar cámara
						</option>
						{videoDevices.map((device) => (
							<option key={device.deviceId} value={device.deviceId}>
								{device.label}
							</option>
						))}
					</select>
				</div>

				<button
					className="w-full"
					onClick={handleSubmit}
					disabled={!selectedAudio && !selectedVideo}
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
						className="icon icon-tabler icons-tabler-outline icon-tabler-check"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M5 12l5 5l10 -10" />
					</svg>
					Confirmar Selección
				</button>
			</section>
		</section>
	);
}
