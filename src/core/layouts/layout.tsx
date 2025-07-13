import { Outlet } from 'react-router-dom';
import { RecordingWrapper } from '../context/recordingContext';
import { ToastContainer } from 'react-toastify';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';

export default function RootLayout() {
	return (
		<div className="flex flex-col justify-between min-h-dvh max-w-7xl mx-auto px-5">
			<RecordingWrapper>
				<Navbar />
				<div className="flex-1 flex flex-col">
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
					<Outlet />
				</div>
				<Footer />
			</RecordingWrapper>
		</div>
	);
}
