import "./Footer.css";

const Footer = () => {
	const year = new Date().getFullYear();
	
	return (
		<footer className="footer">
			<div>Developed by Michelle Souliotis</div>
			<div>{year}</div>
		</footer>
	)
}

export default Footer;
