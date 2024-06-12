'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
	const pathname = usePathname();

	const routes = [
		{
			name: 'Inicio',
			path: '/',
		},
		{
			name: 'Empezar a grabar',
			path: '/recorder',
		},
	];

	const getLinkClass = (path: string) => {
		return pathname === path
			? 'text-congress-blue-50 underline'
			: 'text-congress-blue-100/70';
	};
	return (
		<nav
			className={`flex flex-col  justify-center items-center md:flex-row md:justify-between md:items-center  text-congress-blue-50 md:h-auto bg-[#141414] sticky top-0 z-50`}
		>
			<Link href="/" className="text-2xl p-5">
				Grabar pantalla
			</Link>

			<ul className="flex gap-2 mr-5 mb-5 md:mb-0">
				{routes.map((route, index) => (
					<li key={index}>
						<Link
							href={route.path}
							className={` font-semibold hover:text-congress-blue-100 ${getLinkClass(
								route.path
							)}`}
						>
							{route.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
