import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Avatar from "../Avatar/Avatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({ handleAddClick, handleSignUpClick, handleSignInClick, weatherData, isLoggedIn }) => {
	const currentUser = useContext(CurrentUserContext);
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});

	return (
		<CurrentUserContext.Provider value={currentUser}>
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
									<p className="header__username">{currentUser?.name}</p>
									<Avatar name={currentUser?.name ?? ""} avatar={currentUser?.avatar ?? ""} size={40} />
								</div>
							</Link>
						</>
					)}
				</div>
			</header>
		</CurrentUserContext.Provider>
	);
};

export default Header;
