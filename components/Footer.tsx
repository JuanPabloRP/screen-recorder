import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className="flex flex-wrap flex-col mt-5  px-5 gap-2 justify-center items-center   md:flex-row md:justify-between">
			<h3>Screen recorder</h3>
			<p>Hecho con ❤️</p>
			<ul className="flex flex-wrap gap-2 ">
				<li>Por JuanPabloRP</li>
			</ul>
		</footer>
	);
};

export default Footer;
