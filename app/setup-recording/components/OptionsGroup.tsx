import { useRecordingContext } from '@/context/recordingContext';
import { useState } from 'react';

type Option = {
	id: number;
	name: string;
	isActive: boolean;
	isDisabled?: boolean;
};

type OptionsGroup = {
	type: string;
	title: string;
	options: Option[];
};



const OptionsGroup = ({ type, title, options }: OptionsGroup) => {
	const [isOpen, setIsOpen] = useState(false);
	const { state, dispatch } = useRecordingContext();

	const handleOptionChange = ({ id, name }: Option) => {

		dispatch({
			type: 'SET_RECORDING',
			payload: {
				config: {
					...state.config,
					[type]: {
						...state.config[type],
						value: id,
					},
				},
			},
		});

		setIsOpen(false);
	};

	return (
		<section className="">
			<h2 className="text-center font-bold mb-2 text-2xl">{title}</h2>
			<main className="border border-congress-blue-600 rounded-lg ">
				{options.map((option) => (
					<button
						key={option.id}
						onClick={() => handleOptionChange(option)}
						className={`${
							option.isActive ? 'bg-congress-blue-600' : 'bg-neutral-900'
						} p-3 border-congress-blue-600 first:rounded-l-md last:rounded-r-md hover:bg-gray-700 focus:bg-congress-blue-800 focus:text-congress-blue-100 `}
					>
						{option.name}
					</button>
				))}
			</main>
		</section>
	);
};

export default OptionsGroup;
