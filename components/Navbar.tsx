import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
	return (
		<nav
			className={`flex flex-col  justify-center items-center md:flex-row md:justify-between md:items-center  text-congress-blue-50 md:h-auto bg-[#141414] sticky top-0 z-50`}
		>
			<Link href="/" className="text-2xl p-5">
				Grabar pantalla
			</Link>

			<ul className="flex gap-2 mr-5">
				<li>
					<Link href={'/recorder'}>Empezar a grabar</Link>
				</li>
				{/* <li>
					<Link href="">Sobre el proyecto</Link>
				</li> */}
			</ul>
		</nav>
	);
};

export default Navbar;
