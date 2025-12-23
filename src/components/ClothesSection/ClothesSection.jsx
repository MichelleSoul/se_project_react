import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({ handleAddClick, handleCardClick, handleCardLike, clothingItems }) => {
	const user = useContext(CurrentUserContext);

	const userItems = clothingItems.filter(
		(item) => item.owner === user?._id
	);
	
	return (
		<div className="clothes-section">
			<div style={{ display: 'flex' }}>
				<p>Your items</p>
				<button
					onClick={handleAddClick}
					className="clothes-section__add-clothes-btn"
					style={{ color: "#616161" }}
				>
					+ Add New
				</button>
			</div>
			<ul className="cards__list">
				{userItems.map((item) => (
					<ItemCard
						key={item._id}
						item={item}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
					/>
				))}
			</ul>
		</div>
	)
}

export default ClothesSection;