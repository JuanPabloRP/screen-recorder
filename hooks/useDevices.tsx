export enum DeviceEnum {
	AudioInput = 'audioinput',
	AudioOutput = 'audiooutput',
	VideoInput = 'videoinput',
}

export interface ICheckDevice {
	type: DeviceEnum;
}

const useDevices = () => {
	const getInputDevices = async ({ type }: ICheckDevice) => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			return devices.filter((device) => device.kind === type);
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	return {
		getInputDevices,
	}
};
export default useDevices;
