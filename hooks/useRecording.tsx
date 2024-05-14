import React from 'react';
import useScreenAndAudio from './useScreenAndAudio';
import useCameraAndMic from './useCameraAndMic';

const useRecording = () => {
	const { screenAndAudioRef, setScreenAndAudio } = useScreenAndAudio();
	const {
		cameraAndMicRef,
		setCameraAndMic,
		initializeCameraInPiPMode,
		exitCameraInPictureInPicture,
		toggleCameraPiP,
	} = useCameraAndMic();

  console.log(cameraAndMicRef)

	const handleStartRecording = async () => {
    
  };

	const handleEndRecording = async () => {};

	const handlePauseRecording = async () => {};

	const handleContinueRecording = async () => {};

	const handleDownload = async () => {};

	return {};
};

export default useRecording;
