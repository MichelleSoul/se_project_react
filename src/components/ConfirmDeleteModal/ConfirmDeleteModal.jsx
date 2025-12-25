import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/closeModal.svg";

const ConfirmDeleteModal = ({ onClose, isOpen, onConfirm, onCancel }) => {
	return (
		<div className={`modal ${isOpen ? "modal_opened" : ""}`}>
			<div className="modal__content modal__confirm-delete">
				<button
					onClick={onClose}
					type="button"
					className="modal__close"
				>
					<img className="modal__close-icon" src={closeIcon} alt="Close Icon" />
				</button>
				<div className="modal__confirm-question">
					<p>Are you sure you want to delete this item?</p>
					<p>This action is irreversible.</p>
				</div>
				<div className="modal__confirm-buttons">
					<button onClick={onConfirm} type="button" className="modal__submit_white modal__submit_delete">
						Yes, delete item
					</button>
					<button onClick={onCancel} type="button" className="modal__submit_white">
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDeleteModal;