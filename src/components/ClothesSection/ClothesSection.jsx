import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ handleAddClick, handleCardClick, clothingItems }) => {
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
				{clothingItems.map((item) => (
					<ItemCard
						key={item._id}
						item={item}
						onCardClick={handleCardClick}
					/>
				))}
			</ul>
		</div>
	)
}

export default ClothesSection;