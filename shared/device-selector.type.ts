import { ReactNode } from 'react';

export interface MediaDeviceType {
	deviceId: string;
	label: string;
}

export interface DeviceSelectorType {
	selectedDevice: string;
	setSelectedDevice: (device: string) => void;
	devices: MediaDeviceType[];
	label: string;
	icon?: ReactNode;
	placeholder?: string;
	className?: string;
}
