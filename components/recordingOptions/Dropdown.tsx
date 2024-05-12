import { useRecordingContext } from '@/context/recordingContext';
import { useState } from 'react';

type DropdownProps = {
	type: string;
	title: string;
	options: Option[];
};

type Option = {
	id: number;
	name: string;
	isActive: boolean;
	isDisabled?: boolean;
};

const Dropdown = ({ type, title, options }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { recording, setRecording } = useRecordingContext();

	const handleOptionChange = ({ id, name }: Option) => {
		console.log(`Option ${name} with id ${id} was clicked`);

		setRecording((prev: any) => ({
			...prev,
			config: {
				...prev.config,
				[type]: {
					...prev.config[id],
					value: id,
				},
			},
		}));

		setIsOpen(false);
	};

	return (
		<details open={true}>
			<summary
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer bg-congress-blue-600 p-2 mb-1 rounded-md"
			>
				{title}
			</summary>
			<ul className="">
				{options.map(({ id, name, isActive, isDisabled }: Option, index) => (
					<li
						key={id ?? index}
						className={` fill-slate-950 border border-congress-blue-600   hover:border-congress-blue-900 ${
							isActive ? 'bg-congress-blue-600' : ''
						}  ${isDisabled ? 'text-neutral-800 bg-neutral-950' : ''} `}
					>
						<button
							className={`w-full h-full p-2`}
							disabled={isDisabled}
							onClick={() =>
								handleOptionChange({ id, name, isActive, isDisabled })
							}
						>
							{name}
						</button>
					</li>
				))}
			</ul>
		</details>
	);
};

export default Dropdown;
