'use client';
import { useRecordingContext } from '@/context/recordingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Dropdown from '../recordingOptions/Dropdown';

interface BtnOption {
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
	btnOptions: {
		recordingOptions: BtnOption[];
		FPSoptions: BtnOption[];
	};
	configOptions: {
		fpsOptions: fpsOptions[];
	};
	handleRecordingOptions: (e: any, type: string) => void;
	handleStartRecording: () => void;
}

const RecordingOptions = ({
	btnOptions,
	configOptions,
	handleRecordingOptions,
	handleStartRecording,
}: RecordingOptionsProps) => {
	const { recording, setRecording } = useRecordingContext();

	return (
		<main className="min-h-screen flex flex-col  items-center gap-10 ">
			<section>
				<h1 className="text-4xl font-bold ">¿Que deseas grabar?</h1>
				<ul className="flex flex-wrap gap-5">
					{btnOptions.recordingOptions.map(
						({ id, title, isActive, svg, text }, index) => (
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
						)
					)}
				</ul>
			</section>

			<button
				onClick={() => handleStartRecording()}
				className="mx-auto  text-center text-lg font-bold text-neutral-50 bg-green-700 p-2 rounded-md hover:bg-green-800 focus:bg-green-900 focus:text-congress-blue-100"
			>
				Empezar a grabar
			</button>

			<section>
				<Dropdown
					type="frameRate"
					title="FPS deseados"
					options={configOptions.fpsOptions}
				/>
			</section>
		</main>
	);
};

export default RecordingOptions;


	/* <section>
				<h2 className="text-2xl">FPS deseados</h2>
				<ul className="flex justify-between  gap-5">
					{btnOptions.FPSoptions.map(
						({ id, title, isActive, isDisabled }, index) => (
							<li
								key={index}
								className={`fill-slate-950 border border-congress-blue-600 rounded-md  hover:border-congress-blue-900 ${
									isActive ? 'bg-congress-blue-600' : ''
								}`}
							>
								<button
									id={id}
									className="w-full h-full p-2"
									onClick={(e) => handleRecordingOptions(e, 'FPSoptions')}
									disabled={isDisabled}
								>
									{title}
								</button>
							</li>
						)
					)}
				</ul>
			</section> */

