interface ICheckDevice {
	type: string;
}

export const checkDeviceExistence = async ({ type }: ICheckDevice) => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();

		if (devices.some((device) => device.kind === type)) {
			return devices.find((device) => device.kind === type)?.deviceId;
		}
		console.log(devices);
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};
