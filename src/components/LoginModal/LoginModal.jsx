import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

const AddItemModal = ({ onClose, isOpen, onLoginModalSubmit, loginError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginModalSubmit({ email, password });
    };

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [isOpen]);

    return (
        <ModalWithForm
            title="Sign In"
            buttonText="Log In"
            buttonDisabled={!(email && password)}
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
        >
            <label htmlFor="email" className="modal__label">
                Email{" "}
                <input
                    type="email"
                    className="modal__input"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={handleEmailChange}
                    value={email}
                />
            </label>
            <label htmlFor="password" className="modal__label">
                Password{" "}
                <input
                    type="password"
                    className="modal__input"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={handlePasswordChange}
                    value={password}
                />
            </label>
            {loginError &&
                (<label htmlFor="error" className="modal__label" style={{ color: "#FF4D00" }}>
                    Email or password incorrect{" "}
                </label>)
            }
        </ModalWithForm>
    )
}

export default AddItemModal