interface ICheckDevice {
	type: string;
}

export const getDevices = async ({ type }: ICheckDevice) => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return devices.filter((device) => device.kind === type);
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const checkDeviceExistence = async ({ type }: ICheckDevice) => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();
		//console.log(devices);
		//return devices.some((device) => device.kind === type);

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
