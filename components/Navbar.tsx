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
			className={`flex flex-col  justify-center items-center md:flex-row md:justify-between md:items-center  text-congress-blue-50 md:h-auto bg-[#141414] sticky top-0 z-50`}
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
