import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RecordingWrapper } from '@/context/recordingContext';

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
		<html lang="es">
			<body className={inter.className}>
				<RecordingWrapper>
					<Navbar />
					{children}
					<Footer />
				</RecordingWrapper>
			</body>
		</html>
	);
}
