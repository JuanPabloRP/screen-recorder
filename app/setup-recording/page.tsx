'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import { useConfigOptions } from '@/utils/useRecordingConfig';

import OptionsGroup from '@/app/setup-recording/components/OptionsGroup';
import DeviceSelector from './components/DeviceSelector';
import { useState } from 'react';
import { MediaDeviceType } from '@/shared/device-selector.type';
import Modal from '@/components/Modal';
import { useRecordingControls, useSetupRecordingControls } from '@/hooks';

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

	const { startRecording } = useRecordingControls();
	const { handleRecordingOptions } = useSetupRecordingControls();

	const [permissionError, setPermissionError] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

	const handleRecordingOptionsFunc = async (e: any, isActive: boolean) => {
		const {
			target: { id },
		} = e;

		await handleRecordingOptions(e, 'recordingOptions');

		if (id === 'camera') {
			if (isActive) {
				setSelectedDevices((prev) => [...prev, 'camera']);
			} else {
				setSelectedDevices((prev) =>
					prev.filter((device) => device !== 'camera')
				);
			}
		}

		if (id === 'mic') {
			if (isActive) {
				setSelectedDevices((prev) => [...prev, 'mic']);
			} else {
				setSelectedDevices((prev) => prev.filter((device) => device !== 'mic'));
			}
		}
	};

	const handleStartRecording = async () => {
		if (selectedDevices.length === 0) {
			return startRecording();
		}

		setIsModalOpen(true);

		return (
			<>
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<DeviceSelector />
				</Modal>
			</>
		);
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
