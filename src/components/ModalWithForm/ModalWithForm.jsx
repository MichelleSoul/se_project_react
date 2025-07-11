import "./ModalWithForm.css";
import closeIcon from "../../assets/closeModal.svg";

const ModalWithForm = ({
	children,
	buttonText,
	title,
	onClose,
	isOpen,
}) => {
	return (
		<div className={`modal ${isOpen ? "modal_opened" : ""}`}>
			<div className="modal__content">
				<h2 className="modal__title">{title}</h2>
				<button
					onClick={onClose}
					type="button"
					className="modal__close"
				>
					<img className="modal__close-icon" src={closeIcon} alt="Close Icon" />
				</button>
				<form className="modal__form">
					{children}
					<button type="submit" className="modal__submit">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ModalWithForm;
