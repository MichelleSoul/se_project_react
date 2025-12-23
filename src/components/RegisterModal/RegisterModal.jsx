import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

const RegisterModal = ({ onClose, isOpen, onRegisterModalSubmit }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [hasPassword, setHasPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		onRegisterModalSubmit({
			email,
			name,
			avatar,
			password: formData.get("password"),
		});
	};

	useEffect(() => {
		setEmail("");
		setName("");
		setAvatar("");
		setHasPassword(false);
	}, [isOpen]);

	const isFormValid =
		email && name && avatar && hasPassword;

	return (
		<ModalWithForm
			title="Sign Up"
			buttonText="Sign Up"
			buttonDisabled={!isFormValid}
			onClose={onClose}
			isOpen={isOpen}
			onSubmit={handleSubmit}
		>
			<label className="modal__label">
				Email*
				<input
					type="email"
					name="email"
					className="modal__input"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<label className="modal__label">
				Password*
				<input
					type="password"
					name="password"
					className="modal__input"
					placeholder="Password"
					required
					onChange={(e) => setHasPassword(e.target.value.length > 0)}
				/>
			</label>

			<label className="modal__label">
				Name*
				<input
					type="text"
					name="name"
					className="modal__input"
					placeholder="Name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>

			<label className="modal__label">
				Avatar URL*
				<input
					type="url"
					name="avatar"
					className="modal__input"
					placeholder="Avatar URL"
					required
					value={avatar}
					onChange={(e) => setAvatar(e.target.value)}
				/>
			</label>
		</ModalWithForm>
	);
};

export default RegisterModal;
