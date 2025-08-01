import "./ItemModal.css"
import closeIcon from "../../assets/closeModalWhite.svg";

const ItemModal = ({ onClose, card, isOpen, handleConfirmDelete }) => {
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
				<img src={card.imageUrl} alt={card.name} className="modal__image" />
				<div className="modal__footer">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h2 className="modal__caption">{card.name}</h2>
						<button
							onClick={handleConfirmDelete}
							type="button"
							className="modal__delete_item"
						>
							Delete item
						</button>
					</div>
					<p className="modal__weather">Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
};

export default ItemModal;
