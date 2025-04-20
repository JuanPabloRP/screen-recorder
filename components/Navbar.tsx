'use client';
import { ROUTES_CONSTANTS } from '@/utils/routes.contants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const pathname = usePathname();

	const getLinkClass = (path: string) => {
		return pathname === path
			? 'text-congress-blue-50 underline'
			: 'text-congress-blue-100/70';
	};
	return (
		<nav
			className={`max-w-3xl mx-auto py-2 px-5 lg:py-0 lg:px-7 md:rounded-3xl text-white w-full sticky top-0 md:top-1 z-40 md:flex md:justify-evenly md:content-center backdrop-blur-3xl flex items-center mb-5`}
			style={{}}
		>
			<Link href="/" className="text-2xl p-5">
				Grabar pantalla
			</Link>

			<ul className="flex gap-2 mr-5 mb-5 md:mb-0">
				{ROUTES_CONSTANTS.map(({ name, path }: RouteType) => (
					<li key={name}>
						<Link
							href={path}
							className={` font-semibold hover:text-congress-blue-100 ${getLinkClass(
								path
							)}`}
						>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
