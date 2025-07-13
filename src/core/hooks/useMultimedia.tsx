import { useRecordingContext } from '../context';
import { ACTIONS } from '../../shared';
import { toast } from 'react-toastify';

interface MultimediaType {
	id: string;
	name: string;
	mediaStream: MediaStream;
	HTMLMediaElement: HTMLMediaElement;
}

const useMultimedia = () => {
	const { state, dispatch } = useRecordingContext();

	const getMultimedia = async ({
		media,
		config,
		isVideo,
	}: {
		media: any;
		config: any;
		isVideo: boolean;
	}): Promise<MultimediaType | null> => {
		try {
			const multimedia = await buildMultimedia({
				media,
				config,
				isVideo,
			});
			console.log('Multimedia:', multimedia);
			/* 	 */
			return null;
		} catch (error) {
			toast.error(`Error al obtener ${media.name ?? 'multimedia'}`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
			return null;
		}
	};

	const setMultimediaStream = ({
		multimedia,
	}: {
		multimedia: MultimediaType;
	}) => {
		dispatch({
			type: ACTIONS.SET_MULTIMEDIA,
			payload: {
				multimedia,
			},
		});
	};

	const buildMultimedia = async ({
		media,
		config,
		isVideo,
	}: {
		media: any;
		config: any;
		isVideo: boolean;
	}): Promise<MultimediaType> => {
		const mediaStream = await navigator.mediaDevices.getUserMedia(
			getMediaStream({ config, isVideo })
		);

		const HTMLMediaElement = await getHTMLMediaElement({ mediaStream });

		const multimedia: MultimediaType = {
			mediaStream,
			HTMLMediaElement,
			id: media.id,
			name: media.name,
		};

		return multimedia;
	};

	const getMediaStream = ({
		config,
		isVideo,
	}: {
		config: any;
		isVideo: boolean;
	}): MediaStreamConstraints => {
		return isVideo
			? ({
					video: {
						frameRate: {
							ideal: config.frameRate.value,
						},
					},
			  } as MediaStreamConstraints)
			: ({
					audio: {
						echoCancellation: config.echoCancellation ?? true,
						noiseSuppression: config.noiseSuppression ?? true,
						sampleRate: config.sampleRate ?? 44100,
					},
			  } as MediaStreamConstraints);
	};

	const getHTMLMediaElement = async ({
		mediaStream,
	}: {
		mediaStream: any;
	}): Promise<HTMLMediaElement> => {
		const mediaHTMLElement = document.createElement('video');
		mediaHTMLElement.autoplay = true;
		mediaHTMLElement.muted = true;
		mediaHTMLElement.playsInline = true;
		mediaHTMLElement.controls = false;
		mediaHTMLElement.style.display = 'none';
		document.body.appendChild(mediaHTMLElement);
		mediaHTMLElement.srcObject = mediaStream;

		console.log(mediaHTMLElement);
		return mediaHTMLElement;
	};

	return {
		getMultimedia,
		setMultimediaStream,
	};
};

export default useMultimedia;
