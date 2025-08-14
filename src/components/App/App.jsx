import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItems, deleteItems } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

const App = () => {
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
		_id: "",
		name: "",
		weather: "",
		link: ""
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

	const handleConfirmDelete = () => {
		setActiveModal("confirm-delete");
	}

	const handleDeletion = () => {
		setClothingItems(items => items.filter(item => item._id !== selectedCard._id));
		deleteItems(selectedCard._id)
		closeActiveModal();
	}

	const closeActiveModal = () => {
		setActiveModal("");
	};

	const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
		const _id = Math.max(...clothingItems.map((item) => item._id)) + 1;
		addItems({_id, name, imageUrl, weather});
		setClothingItems((prevItems) => [{ _id, name, imageUrl, weather }, ...prevItems]);
		closeActiveModal();
	}

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
			<div className="page">
				<div className="page__content">
					<Header handleAddClick={handleAddClick} weatherData={weatherData} />
					<Routes>
						<Route path="/" element={
							<Main
								weatherData={weatherData}
								handleCardClick={handleCardClick}
								clothingItems={clothingItems}
							/>}
						/>
						<Route path="/profile" element={
							<Profile
								handleAddClick={handleAddClick}
								handleCardClick={handleCardClick}
								clothingItems={clothingItems}
							/>}
						/>
					</Routes>

					<Footer />
				</div>
				<AddItemModal
					onClose={closeActiveModal}
					isOpen={activeModal === "add-garment"}
					onAddItemModalSubmit={handleAddItemModalSubmit}
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
			</div>
		</CurrentTemperatureUnitContext.Provider>
	);
};

export default App;
