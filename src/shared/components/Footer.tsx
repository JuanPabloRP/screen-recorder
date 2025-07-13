const Footer = () => {
	return (
		<footer className="flex flex-wrap flex-col mt-5 px-5 gap-2 justify-center items-center  md:flex-row md:justify-between bg-secondary/5 py-5 my-5 rounded-3xl ">
			<h3>Grabar pantalla</h3>

			<a href="https://jprp-portfolio.vercel.app/" target="_blank">
				Hecho con ❤️ por{' '}
				<span className="text-tertiary underline">JuanPabloRP</span>
			</a>
		</footer>
	);
};

export default Footer;
