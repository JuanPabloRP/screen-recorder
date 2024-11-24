'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import { useConfigOptions } from '@/hooks/useRecordingConfig';
import useRecording from '@/hooks/useRecording';
import { getDevices } from '@/utils/helpers';
import GroupButton from '@/app/setup-recording/components/OptionsGroup';
import OptionsGroup from '@/app/setup-recording/components/OptionsGroup';
import DeviceSelector from './components/DeviceSelector';
import { useState } from 'react';
import { MediaDeviceType } from '@/shared/device-selector.type';
import Modal from '@/components/Modal';

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
	const { recordingOptions, fpsOptions, fileTypeOptions } = useConfigOptions();
	const { startRecording, handleRecordingOptions } = useRecording();
	const [permissionError, setPermissionError] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

	const handleRecordingOptionsFunc = async (e: any, isActive: boolean) => {
		const {
			target: { id },
		} = e;

		console.log(id, isActive);
		handleRecordingOptions(e, 'recordingOptions');

		if (id === 'camera' && isActive) {
			setSelectedDevices((prev) => [...prev, 'camera']);
		}

		if (id === 'microphone' && isActive) {
			setSelectedDevices((prev) => [...prev, 'mic']);
		}
	};

	const handleStartRecording = async () => {
		startRecording();
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
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			<section>
				<h1 className="text-center text-4xl font-bold mb-5">
					¿Que deseas grabar?
				</h1>

				<ul className="flex flex-wrap gap-5">
					{recordingOptions.map(
						(
							{ id, title, isActive, svg, text }: RecordingOptionType,
							index: number
						) => (
							<li
								key={index}
								className={`flex flex-col gap-3 justify-center items-center w-36 h-36 rounded-md border border-congress-blue-600  ${
									isActive
										? 'bg-congress-blue-600  hover:bg-congress-blue-600/80 '
										: 'hover:border-congress-blue-400 hover:bg-neutral-900'
								}  relative`}
							>
								<article
									className="absolute flex flex-col gap-2
								w-full h-full justify-center items-center
							"
								>
									<Image src={svg} alt="svg" className="text-white " />
									<p className="text-center">{text}</p>
								</article>

								<button
									id={id}
									className="w-full h-full flex justify-center items-center z-100 absolute "
									onClick={(e) => handleRecordingOptionsFunc(e, isActive)}
								></button>
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

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<DeviceSelector />
			</Modal>

			{/* Opciones de grabación */}
			{/* Fps options */}
			<section>
				<OptionsGroup
					type="frameRate"
					title="FPS deseados"
					options={fpsOptions}
				/>
			</section>
		</main>
	);
};

export default SetupRecording;
