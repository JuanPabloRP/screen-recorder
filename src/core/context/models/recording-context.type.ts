export interface RecordingStateType {
	recordingState: string;
	setupOptions: {
		multimedia: {
			screen: {
				isActive: boolean;
			};
			audio: {
				isActive: boolean;
			};
			camera: {
				isActive: boolean;
			};
			mic: {
				isActive: boolean;
			};
		};
	};
	multimediaSteams: {
		screen: any;
		audio: any;
		camera: any;
		mic: any;
	};
	mediaRecorder: any;
	config: {
		resolution: any;
		quality: any;
		fileType: {
			value: string;
		};
		frameRate: {
			value: number;
		};
	};
}
