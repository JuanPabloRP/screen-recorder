interface ICheckDevice {
	type: string;
}

export const checkDeviceExistence = async ({ type }: ICheckDevice) => {
	try {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return devices.some((device) => device.kind === type);
		//console.log(device);
	} catch (error) {
		console.log(error);
	}
};

export interface MediaElementWithSrcObject extends HTMLMediaElement {
	srcObject: MediaStream | null;
}
