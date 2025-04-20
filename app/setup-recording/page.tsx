'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import { useRecordingControls, useSetupRecordingControls } from '@/hooks';

import screen from '@/public/svg/screen.svg';
import audio from '@/public/svg/audio.svg';
import video from '@/public/svg/video.svg';
import mic from '@/public/svg/mic.svg';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

interface RecordingOptionType {
	id: string;
	title: string;
	isActive: boolean;
	isDisabled?: boolean;
	svg: string | StaticImport;
	text: string;
}

interface FpsOptionsType {
	id: number;
	name: string;
	isActive: boolean;
	isDisabled?: boolean;
}

interface RecordingOptionsPropsType {
	configOptions: {
		fpsOptions: FpsOptionsType[];
		recordingOptions: RecordingOptionType[];
	};
	handleRecordingOptions: (e: any, type: string) => void;
	handleStartRecording: () => void;
}

const SetupRecording = () => {
	const { state, dispatch } = useRecordingContext();

	const router = useRouter();
	const { startRecording } = useRecordingControls();
	const { handleRecordingOptions } = useSetupRecordingControls();

	const handleStartRecording = async () => {
		startRecording();
	};

	const recordingOptions = [
		{
			id: 'screen',
			title: 'Grabar pantalla',
			isActive: true,
			svg: screen,
			text: 'Pantalla',
		},
		{
			id: 'audio',
			title: 'Grabar audio',
			isActive: state.setupOptions.multimedia.audio?.isActive,
			svg: audio,
			text: 'Audio',
		},
		{
			id: 'camera',
			title: 'Grabar cámara',
			isActive: state.setupOptions.multimedia.camera?.isActive,
			svg: video,
			text: 'Cámara',
		},
		{
			id: 'mic',
			title: 'Grabar micrófono',
			isActive: state.setupOptions.multimedia.mic?.isActive,
			svg: mic,
			text: 'Micrófono',
		},
	];

	/* const fpsOptions = [
		{
			id: 25,
			name: '25',
			isActive: state.config?.frameRate?.value === 25,
			isDisabled: state.isRecording,
		},
		{
			id: 30,
			name: '30 (Por defecto)',
			isActive: state.config?.frameRate?.value === 30,
			isDisabled: state.isRecording,
		},
		{
			id: 60,
			name: '60',
			isActive: state.config?.frameRate?.value === 60,
			isDisabled: state.isRecording,
		},
	];
 */

	/* if (permissionError) {
		toast.error('🦄 Wow so easy!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	} */

	return (
		<main className="min-h-full flex flex-col  items-center gap-10 ">
			<section>
				<h1 className="text-center text-4xl font-bold mb-5">
					¿Que deseas grabar?
				</h1>

				<ul className="flex flex-wrap gap-5">
					{recordingOptions.map(
						(
							{ id, isActive, svg, text }: RecordingOptionType,
							index: number
						) => (
							<li
								key={index}
								id={id}
								className={`flex flex-col gap-3 justify-center items-center w-36 h-36 rounded-md border border-congress-blue-600 ${
									isActive
										? 'bg-congress-blue-600 hover:bg-congress-blue-600/80'
										: 'hover:border-congress-blue-400 hover:bg-neutral-900'
								} cursor-pointer z-30`}
								onClick={(e) => handleRecordingOptions(e)}
							>
								<Image
									src={svg}
									alt="svg"
									className="text-white -z-50"
									style={{
										pointerEvents: 'none',
									}}
								/>
								<span
									className="text-center -z-50"
									style={{ pointerEvents: 'none' }}
								>
									{text}
								</span>
							</li>
						)
					)}
				</ul>
			</section>
			{/* Empezar a grabar */}
			<button
				onClick={() => handleStartRecording()}
				className="mx-auto  text-center text-lg font-bold text-neutral-50 bg-green-700 p-2 rounded-md hover:bg-green-800 focus:bg-green-900 focus:text-congress-blue-100"
			>
				Empezar a grabar
			</button>

			{/* Opciones de grabación */}
			{/* Fps options */}
			{/* <section>
				<OptionsGroup
					type="frameRate"
					title="FPS deseados"
					options={fpsOptions}
				/>
			</section> */}
		</main>
	);
};

export default SetupRecording;
