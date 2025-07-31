import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClohtesSection/ClothesSection";

const Profile = ({ handleAddClick, handleCardClick, clothingItems }) => {
	return (
		<main className="profile">
			<section className="profile__sidebar">
				<SideBar />
			</section>
			<section className="profile__clothing-items">
				<ClothesSection
					handleAddClick={handleAddClick}
					handleCardClick={handleCardClick}
					clothingItems={clothingItems} />
			</section>
		</main>
	)
}

export default Profile;