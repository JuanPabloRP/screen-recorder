import { Link, useLocation } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../utils/routes.contants';

const Navbar = () => {
	const location = useLocation();

	const getLinkClass = (path: string) => {
		return location.pathname === path
			? 'text-tertiary underline'
			: 'text-secondary/90';
	};

	return (
		<nav className="max-w-3xl mx-auto py-2 px-5 lg:py-0 lg:px-7 md:rounded-3xl bg-secondary/5 w-full sticky top-0 md:top-1 z-40 md:flex md:justify-evenly md:content-center backdrop-blur-3xl flex items-center my-5">
			<Link to="/" className="text-2xl p-5 text-tertiary">
				Grabar pantalla
			</Link>

			<ul className="flex gap-2 mr-5 mb-5 md:mb-0">
				{ROUTES_CONSTANTS.map(({ name, path }) => (
					<li key={name}>
						<Link
							to={path}
							className={`font-semibold hover:text-tertiary ${getLinkClass(
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
