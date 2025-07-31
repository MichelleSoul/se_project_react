import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

const App = () => {
	const [weatherData, setWeatherData] = useState({
		type: "",
		temp: { F: 999, C: 999 },
		city: "",
		condition: "",
		isDay: true,
	});
	const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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

	const closeActiveModal = () => {
		setActiveModal("");
	};

	const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
		const newId = Math.max(...clothingItems.map((item)=>item._id)) + 1;
		// Update clothingItems array
		setClothingItems((prevItems) => [{ _id: newId, name, link: imageUrl, weather },  ...prevItems]);
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

	return (
		<CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
			<div className="page">
				<div className="page__content">
					<Header handleAddClick={handleAddClick} weatherData={weatherData} />
					<Main
						weatherData={weatherData}
						handleCardClick={handleCardClick}
						clothingItems={clothingItems}
					/>
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
					isOpen={activeModal === "preview"}
				/>
			</div>
		</CurrentTemperatureUnitContext.Provider>
	);
};

export default App;
