import "./ItemCard.css";
import { useContext } from "react";
import heart from "../../assets/heart.svg";
import liked from "../../assets/heartliked.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onCardClick, onCardLike }) => {
	const currentUser = useContext(CurrentUserContext);
	const isLoggedIn = Boolean(currentUser?._id);

	const isLiked = isLoggedIn
		? item.likes.some((id) => id === currentUser._id)
		: false;

	const handleCardClick = () => {
		onCardClick(item);
	};

	const handleLike = () => {
		onCardLike(item);
	};

	return (
		<li className="card">
			<div className="card__label">
				<h2 className="card__name">{item.name}</h2>
				{isLoggedIn && (
					<img
						src={isLiked ? liked : heart}
						className="card__like"
						onClick={handleLike}
					/>)}
			</div>
			<img
				onClick={handleCardClick}
				className="card__image"
				src={item.imageUrl}
				alt={item.name}
			/>
		</li>
	);
};

export default ItemCard;
