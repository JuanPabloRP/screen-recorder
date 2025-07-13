import { useEffect } from 'react';

const ConfirmationPrompt = () => {
	useEffect(() => {
		const handleUnload = (e: any) => {
			e.preventDefault();

			const confirmationMessage =
				'¿Estás seguro que quieres salir?, lo que esten grabando se perdera';
			e.returnValue = confirmationMessage;

			return confirmationMessage;
		};

		window.addEventListener('beforeunload', (e) => handleUnload(e));

		return () => {
			window.removeEventListener('beforeunload', (e) => handleUnload(e));
		};
	}, []);
	return (
		<>
		</>
	);
};

export default ConfirmationPrompt;
