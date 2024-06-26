'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Dropdown from '../recordingOptions/Dropdown';
import GroupButton from '../recordingOptions/GroupButtons';
import { useConfigOptions } from '@/hooks/useRecordingConfig';
import useRecording from '@/hooks/useRecording';
import DeviceSelector from '../DeviceSelector';
import { getDevices } from '@/utils/helpers';

interface RecordingOption {
	id: string;
	title: string;
	isActive: boolean;
	isDisabled?: boolean;
	svg: string | StaticImport;
	text: string;
}

interface fpsOptions {
	id: number;
	name: string;
	isActive: boolean;
	isDisabled?: boolean;
}

interface RecordingOptionsProps {
	configOptions: {
		fpsOptions: fpsOptions[];
		recordingOptions: RecordingOption[];
	};
	handleRecordingOptions: (e: any, type: string) => void;
	handleStartRecording: () => void;
}

const RecordingOptions = () => {
	const { state, dispatch } = useRecordingContext();
	const { recordingOptions, fpsOptions, fileTypeOptions } = useConfigOptions();
	const { startRecording, handleRecordingOptions } = useRecording();

	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			{/* Que desea grabar */}
			<section>
				<h1 className="text-center text-4xl font-bold mb-5">
					¿Que deseas grabar?
				</h1>

				<ul className="flex flex-wrap gap-5">
					{recordingOptions.map(({ id, title, isActive, svg, text }, index) => (
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
								onClick={(e) => handleRecordingOptions(e, 'recordingOptions')}
							></button>
						</li>
					))}
				</ul>
			</section>

			{/* Empezar a grabar */}
			<button
				onClick={startRecording}
				className="mx-auto  text-center text-lg font-bold text-neutral-50 bg-green-700 p-2 rounded-md hover:bg-green-800 focus:bg-green-900 focus:text-congress-blue-100"
			>
				Empezar a grabar
			</button>

			{/* Elegir camara y microfono */}
			{/* Cambiar xd */}

			{/* Opciones de grabación */}
			{/* Fps options */}
			<section>
				<GroupButton
					type="frameRate"
					title="FPS deseados"
					options={fpsOptions}
				/>
			</section>
		</main>
	);
};

export default RecordingOptions;
