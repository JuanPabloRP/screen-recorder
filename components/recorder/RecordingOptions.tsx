'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface BtnOption {
	id: string;
	title: string;
	active: boolean;
	disabled?: boolean ;
	svg: string | StaticImport;
}

interface RecordingOptionsProps {
	btnOptions: {
		recordingOptions: BtnOption[];
		FPSoptions: BtnOption[];
	};
	handleRecordingOptions: (e: any, type: string) => void; // Reemplaza 'any' con el tipo correcto para 'e'
	handleStartRecording: () => void;
}

const RecordingOptions = ({
	btnOptions,
	handleRecordingOptions,
	handleStartRecording,
}: RecordingOptionsProps) => {
	const { recording, setRecording } = useRecordingContext();

	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
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
				{btnOptions.FPSoptions.map(({ id, title, active, disabled }, index) => (
					<li
						key={index}
						className={`fill-slate-950 border border-congress-blue-600 rounded-md  hover:border-congress-blue-900 ${
							active ? 'bg-congress-blue-600' : ''
						}`}
					>
						<button
							id={id}
							className="w-full h-full p-2"
							onClick={(e) => handleRecordingOptions(e, 'FPSoptions')}
							disabled={disabled}
						>
							{title}
						</button>
					</li>
				))}
			</ul>

			<button
				onClick={() => handleStartRecording()}
				className="mx-auto  text-center text-lg bg-congress-blue-500 p-2 rounded-md hover:bg-congress-blue-600 focus:bg-congress-blue-800 focus:text-congress-blue-100"
			>
				Empezar
			</button>
		</main>
	);
};

export default RecordingOptions;
