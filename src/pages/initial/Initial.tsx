'use client';

import { ROUTES_CONSTANTS } from '../../shared';
import { Link } from 'react-router-dom';
import Rec from '../../../public/svg/rec1.svg';

export default function Home() {
	return (
		<>
			<main className="">
				<header className="flex justify-around items-center flex-wrap gap-11 lg:gap-2">
					<div className="text-3xl font-bold">
						<h1 className="text-balance text-secondary ">Grabar pantalla</h1>
						<p className="uppercase text-secondary text-5xl mb-5">
							online y gratis
						</p>
						<Link
							to={
								ROUTES_CONSTANTS.find((r) => r.key === 'SETUP_RECORDING')?.path!
							}
							className="mx-auto text-center text-lg bg-complementary
							text-secondary px-4 py-2 rounded-md hover:bg-complementary/80 
							focus:bg-complementary/60 transition-all font-bold"
						>
							Empezar a grabar
						</Link>
					</div>
					<div className="flex justify-center items-center h-96 w-96">
						<DarkVideoIcon />
					</div>
				</header>
				<section className="flex flex-wrap justify-center  gap-4 mt-2">
					<article className="w-72 bg-secondary/5 p-5 rounded-md border border-transparent hover:border-secondary transition-all ">
						<h2 className="text-xl  font-bold">¿Es seguro?</h2>
						<p className="text-secondary/90">
							Sí, la web es completamnete segura
						</p>
					</article>
					<article className="w-72 bg-secondary/5 p-5 rounded-md border border-transparent hover:border-secondary transition-all ">
						<h2 className="text-xl  font-bold">¿Es totalmente gratis?</h2>
						<p className="text-secondary/90">Sí, su uso es 100% gratis</p>
					</article>
					<article className="w-72 bg-secondary/5 p-5 rounded-md border border-transparent hover:border-secondary transition-all ">
						<h2 className="text-xl  font-bold">¿Cómo aporto?</h2>
						<p className="text-secondary/90">
							Puedes apoyar este proyecto aportando en el{' '}
							<a
								href="https://github.com/JuanPabloRP/screen-recorder"
								target="_blank"
								className="text-tertiary underline"
							>
								repositorio
							</a>{' '}
							de este proyecto.
						</p>
						<p className="text-secondary/90">También puedes </p>
						<a
							href="https://buymeacoffee.com/juanpablorp"
							target="_blank"
							className="text-complementary bold underline"
						>
							comprarme un café ☕
						</a>
					</article>
				</section>
			</main>
		</>
	);
}

const DarkVideoIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 340"
		width="300"
		height="200"
		role="img"
	>
		<rect
			x="40"
			y="40"
			width="420"
			height="260"
			rx="16"
			fill="#000000"
			stroke="#CC66DA"
			strokeWidth="2"
		/>
		<rect
			x="60"
			y="60"
			width="380"
			height="220"
			rx="12"
			fill="#000000"
			stroke="#9929EA"
			strokeWidth="2"
		/>
		<rect
			x="80"
			y="80"
			width="340"
			height="180"
			rx="10"
			fill="#000000"
			stroke="#FAEB92"
			strokeWidth="2"
		/>
		<rect x="160" y="130" width="120" height="80" rx="10" fill="#9929EA" />
		<path d="M280,140 L320,120 V220 L280,200 Z" fill="#9929EA" />
		<circle cx="400" cy="260" r="18" fill="#FAEB92" />
		<polygon points="395,250 410,260 395,270" fill="#000000" />
	</svg>
);
