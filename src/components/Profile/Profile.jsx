import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ handleAddClick, handleCardClick, handleCardLike, clothingItems, handleChangeProfileDataClick, onSignOut, name, avatar }) => {
	return (
		<main className="profile">
			<section className="profile__sidebar">
				<SideBar
					handleChangeProfileDataClick={handleChangeProfileDataClick}
					onSignOut={onSignOut}
					name={name}
					avatar={avatar}
				/>
			</section>
			<section className="profile__clothing-items">
				<ClothesSection
					handleAddClick={handleAddClick}
					handleCardClick={handleCardClick}
					handleCardLike={handleCardLike}
					clothingItems={clothingItems} />
			</section>
		</main>
	)
}

export default Profile;