import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RecordingWrapper } from '@/context/recordingContext';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Grabar pantalla',
	description: 'Grabar pantalla online y gratis',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="es"
			style={{
				scrollBehavior: 'smooth',
				minHeight: '100vh',
			}}
		>
			<body
				className={inter.className}
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<RecordingWrapper>
					<Navbar />
					<main style={{ minHeight: 'calc(100vh-120px) !important' }}>
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
						<ToastContainer />
						{children}
					</main>
					<Footer />
				</RecordingWrapper>
			</body>
		</html>
	);
}
