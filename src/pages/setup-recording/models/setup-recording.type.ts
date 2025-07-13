export interface RecordingOptionType {
	id: string;
	title: string;
	isActive: boolean;
	isDisabled?: boolean;
	svg: string;
	text: string;
}

export interface FpsOptionsType {
	id: number;
	name: string;
	isActive: boolean;
	isDisabled?: boolean;
}

export interface RecordingOptionsPropsType {
	configOptions: {
		fpsOptions: FpsOptionsType[];
		recordingOptions: RecordingOptionType[];
	};
	handleRecordingOptions: (e: any, type: string) => void;
	handleStartRecording: () => void;
}
