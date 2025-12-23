import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Avatar from "../Avatar/Avatar";

const Header = ({ handleAddClick, handleSignUpClick, handleSignInClick, weatherData, isLoggedIn, name, avatar }) => {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});

	return (
		<header className="header">
			<Link to='/'>
				<img className="header__logo" src={logo} alt="wtwr logo" />
			</Link>
			<p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
			<div className="header__right">
				<ToggleSwitch />
				{!isLoggedIn && (
					<>
						<button
							onClick={handleSignUpClick}
							type="button"
							className="header__sign-btn"
						>
							Sign Up
						</button>
						<button
							onClick={handleSignInClick}
							type="button"
							className="header__sign-btn"
						>
							Sign In
						</button>
					</>
				)}
				{isLoggedIn && (
					<>
						<button
							onClick={handleAddClick}
							type="button"
							className="header__add-clothes-btn"
						>
							+ Add clothes
						</button>
						<Link to='/profile' className="header__home-link">
							<div className="header__user-container">
								<p className="header__username">{name}</p>
								<Avatar name={name} avatar={avatar} size={40} />
							</div>
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
