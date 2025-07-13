import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './core/layouts/layout';
import Home from './pages/initial/Initial';
import SetupRecording from './pages/setup-recording/SetupRecording';
import Recording from './pages/recording/Recording';
import RecordingPreview from './pages/recording-preview/RecordingPreview';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<RootLayout />}>
						<Route path="" element={<Home />} />
						<Route path="/setup-recording" element={<SetupRecording />} />
						<Route path="/recording" element={<Recording />} />
						<Route path="/recording-preview" element={<RecordingPreview />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
