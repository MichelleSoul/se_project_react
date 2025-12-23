import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import ChangeProfileDataModal from "../ChangeProfileDataModal/ChangeProfileDataModal";
import { getItems, addItems, deleteItems, updateUserProfile, addCardLike, removeCardLike } from "../../utils/api";
import { signin, signup, checkToken } from "../../utils/auth";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		_id: "",
		name: "",
		avatar: "",
		email: "",
		__v: "",
	});
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	const [weatherData, setWeatherData] = useState({
		type: "",
		temp: { F: 999, C: 999 },
		city: "",
		condition: "",
		isDay: true,
	});
	const [clothingItems, setClothingItems] = useState([]);
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({
		__v: "",
		_id: "",
		createAt: "",
		imageUrl: "",
		likes: [],
		name: "",
		owner: "",
		weather: "",
	});
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

	const handleToggleSwitchChange = () => {
		setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
	}

	const handleCardClick = (card) => {
		setActiveModal("preview");
		setSelectedCard(card);
	};

	const handleAddClick = () => {
		setActiveModal("add-garment");
	};

	const handleSignUpClick = () => {
		setActiveModal("sign-up");
	};

	const handleSignInClick = () => {
		setActiveModal("sign-in");
	};

	const handleChangeProfileDataClick = () => {
		setActiveModal("change-profile-data");
	}


	const handleConfirmDelete = () => {
		setActiveModal("confirm-delete");
	}

	const handleDeletion = () => {
		deleteItems(selectedCard._id).then(() => {
			setClothingItems(items => items.filter(item => item._id !== selectedCard._id));
			closeActiveModal();
		}).catch(console.error);
	}

	const handleUpdateUserProfile = (name, avatar) => {
		updateUserProfile(name, avatar).then((userData) => {
			setCurrentUser(userData);
			closeActiveModal();
		}).catch(console.error);
	}

	const handleSignOut = () => {
		localStorage.removeItem("jwt");
		setCurrentUser({
			_id: "",
			name: "",
			avatar: "",
			email: "",
			__v: "",
		});
		setIsLoggedIn(false);
	};


	const closeActiveModal = () => {
		setActiveModal("");
	};

	const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
		addItems({ name, imageUrl, weather })
			.then((newItem) => {
				setClothingItems((prevItems) => [newItem, ...prevItems]);
				closeActiveModal();
			})
			.catch(console.error);
	};

	const handleLoginModalSubmit = ({ email, password }) => {
		signin({ email, password })
			.then((res) => {
				localStorage.setItem("jwt", res.token);
				setLoginError(false);
				setIsLoggedIn(true);
				return checkToken(res.token);
			})
			.then((userData) => {
				setCurrentUser(userData);
				closeActiveModal();
			})
			.catch((e) => {
				console.error(e);
				setLoginError(true);
			});
	}

	const handleRegisterModalSubmit = ({ name, avatar, email, password }) => {
		signup({ name, avatar, email, password })
			.then(() => {
				return signin({ email, password });
			})
			.then((res) => {
				localStorage.setItem("jwt", res.token);
				setIsLoggedIn(true);
				return checkToken(res.token);
			})
			.then((userData) => {
				setCurrentUser(userData);
				closeActiveModal();
			})
			.catch(console.error);
	}

	const handleCardLike = ({ _id, likes }) => {
		const userId = currentUser._id;
		const isLiked = likes.some((id) => id === userId);

		const likeRequest = isLiked
			? removeCardLike(_id)
			: addCardLike(_id);

		likeRequest
			.then((updatedCard) => {
				setClothingItems((items) =>
					items.map((item) =>
						item._id === _id ? updatedCard : item
					)
				);
			})
			.catch(console.error);
	};


	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (!token) {
			setIsCheckingAuth(false);
			return;
		}

		checkToken(token)
			.then((userData) => {
				setCurrentUser(userData);
				setIsLoggedIn(true);
			})
			.catch(() => {
				localStorage.removeItem("jwt");
				setIsLoggedIn(false);
			})
			.finally(() => {
				setIsCheckingAuth(false);
			});
	}, []);


	useEffect(() => {
		getWeather(coordinates, APIkey)
			.then((data) => {
				const filteredData = filterWeatherData(data);
				setWeatherData(filteredData);
			})
			.catch(console.error);
	}, []);

	useEffect(() => {
		getItems()
			.then((data) => {
				setClothingItems(data.reverse())
			}).catch(console.error);
	}, []);

	return (
		<CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					<div className="page__content">
						<Header
							handleAddClick={handleAddClick}
							handleSignUpClick={handleSignUpClick}
							handleSignInClick={handleSignInClick}
							weatherData={weatherData}
							isLoggedIn={isLoggedIn}
							name={currentUser?.name ?? ""}
							avatar={currentUser?.avatar ?? ""}
						/>
						<Routes>
							<Route path="/" element={
								<Main
									weatherData={weatherData}
									handleCardClick={handleCardClick}
									handleCardLike={handleCardLike}
									clothingItems={clothingItems}
								/>}
							/>
							<Route path="/profile" element={
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									isCheckingAuth={isCheckingAuth}
								>
									<Profile
										handleAddClick={handleAddClick}
										handleCardClick={handleCardClick}
										handleCardLike={handleCardLike}
										handleChangeProfileDataClick={handleChangeProfileDataClick}
										clothingItems={clothingItems}
										onSignOut={handleSignOut}
										name={currentUser?.name ?? ""}
										avatar={currentUser?.avatar ?? ""}
									/>
								</ProtectedRoute>}
							/>
						</Routes>

						<Footer />
					</div>
					<AddItemModal
						onClose={closeActiveModal}
						isOpen={activeModal === "add-garment"}
						onAddItemModalSubmit={handleAddItemModalSubmit}
					/>
					<RegisterModal
						onClose={closeActiveModal}
						isOpen={activeModal === "sign-up"}
						onRegisterModalSubmit={handleRegisterModalSubmit}
					/>
					<LoginModal
						onClose={closeActiveModal}
						isOpen={activeModal === "sign-in"}
						onLoginModalSubmit={handleLoginModalSubmit}
						loginError={loginError}
					/>
					<ItemModal
						card={selectedCard}
						onClose={closeActiveModal}
						handleConfirmDelete={handleConfirmDelete}
						isOpen={activeModal === "preview"}
					/>
					<ConfirmDeleteModal
						onClose={closeActiveModal}
						isOpen={activeModal === "confirm-delete"}
						onConfirm={handleDeletion}
						onCancel={closeActiveModal}
					/>
					{currentUser && (
						<ChangeProfileDataModal
							profileName={currentUser.name || ""}
							profileAvatar={currentUser.avatar || ""}
							onClose={closeActiveModal}
							isOpen={activeModal === "change-profile-data"}
							onChangeProfileDataModalSubmit={handleUpdateUserProfile}
						/>
					)}
				</div>
			</CurrentUserContext.Provider>
		</CurrentTemperatureUnitContext.Provider>
	);
};

export default App;
