import { useRecordingContext } from '../../core/context/recordingContext';

import screen from '../../assets/svg/screen.svg';
import audio from '../../assets/svg/audio.svg';
import video from '../../assets/svg/video.svg';
import mic from '../../assets/svg/mic.svg';
import { setSetupRecording } from './configs/setup-recording.function';
import { RecordingOptionType } from './models';
import useRecordingControls from '../../core/hooks/useRecordingControls';
import useSetupRecordingControls from '../../core/hooks/useSetupRecordingControls';

const SetupRecording = () => {
	const { state } = useRecordingContext();

	const { startRecording } = useRecordingControls();
	const { handleRecordingOptions } = useSetupRecordingControls();

	const handleStartRecording = async () => {
		startRecording();
	};

	const recordingOptions = setSetupRecording({
		state,
		images: {
			screen,
			audio,
			video,
			mic,
		},
	});

	return (
		<main className="min-h-full flex flex-col  items-center gap-10 mt-10 ">
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
								className={`flex flex-col gap-3 justify-center items-center w-36 h-36 rounded-md border border-secondary ${
									isActive
										? 'bg-secondary hover:bg-secondary/80'
										: 'hover:border-secondary/50 hover:bg-secondary/50'
								} cursor-pointer z-30`}
								onClick={(e) => handleRecordingOptions(e)}
							>
								<img
									src={svg}
									alt="svg"
									className="text-complementary -z-50"
									style={{
										pointerEvents: 'none',
									}}
								/>
								<span
									className="text-center -z-50 text-complementary"
									style={{ pointerEvents: 'none' }}
								>
									{text}
								</span>
							</li>
						)
					)}
				</ul>
			</section>

			<button
				onClick={() => handleStartRecording()}
				className="mx-auto text-center text-lg font-bold cursor-pointer text-secondary focus:text-secondary/90 bg-complementary p-2 rounded-md hover:bg-complementary focus:bg-complementary"
			>
				Empezar a grabar
			</button>
		</main>
	);
};

export default SetupRecording;
