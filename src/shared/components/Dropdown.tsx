import { useState } from 'react';
import { useRecordingContext } from '../../core';

type DropdownProps = {
	type: string;
	title: string;
	options: Option[];
	handleChange: (option: Option) => void;
};

type Option = {
	id: number;
	name: string;
	isActive?: boolean;
	isDisabled?: boolean;
};

const Dropdown = ({ type, title, options, handleChange }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { state } = useRecordingContext();

	const handleOptionChange = ({ id, name }: Option) => {
		handleChange({ id, name });
		setIsOpen(false);
	};

	return (
		<details open={true}>
			<summary
				onClick={() => setIsOpen(!isOpen)}
				className="cursor-pointer bg-secondary p-2 mb-1 rounded-md"
			>
				{title}
			</summary>
			<ul className="">
				{options.map(({ id, name, isActive, isDisabled }: Option, index) => (
					<li
						key={id ?? index}
						className={` fill-slate-950 border border-secondary/95 hover:border-secondary/90 ${
							isActive ? 'bg-secondary' : ''
						}  ${
							isDisabled ? 'text-neutral-800 bg-neutral-950' : ''
						} first:rounded-t-md last:rounded-b-md`}
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
