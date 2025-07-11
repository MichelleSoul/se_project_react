import "./ItemModal.css"
import closeIcon from "../../assets/closeModalWhite.svg";

const ItemModal = ({ onClose, card, isOpen }) => {
	return (
		<div className={`modal ${isOpen ? "modal_opened" : ""}`}>
			<div className="modal__content modal__content_type_image">
				<button
					onClick={onClose}
					type="button"
					className="modal__close modal__close_item"
				>
					<img className="modal__close-icon" src={closeIcon} alt="Close Icon" />
				</button>
				<img src={card.link} alt={card.name} className="modal__image" />
				<div className="modal__footer">
					<h2 className="modal__caption">{card.name}</h2>
					<p className="modal__weather">Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
};

export default ItemModal;
