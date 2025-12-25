import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

const ChangeProfileDataModal = ({
    onClose,
    isOpen,
    onChangeProfileDataModalSubmit,
    profileName,
    profileAvatar,
}) => {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onChangeProfileDataModalSubmit({ name, avatar });
    };

    useEffect(() => {
        setName(profileName);
        setAvatar(profileAvatar);
    }, [isOpen, profileAvatar, profileName]);

    return (
        <ModalWithForm
            title="Change profile data"
            buttonText="Save changes"
            buttonDisabled={!(name && avatar)}
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name" className="modal__label">
                Name*{" "}
                <input
                    type="text"
                    className="modal__input"
                    id="change_name"
                    placeholder="Name"
                    required
                    onChange={handleNameChange}
                    value={name}
                />
            </label>
            <label htmlFor="avatar" className="modal__label">
                Avatar*{" "}
                <input
                    type="url"
                    className="modal__input"
                    id="avatar"
                    placeholder="Avatar"
                    required
                    onChange={handleAvatarChange}
                    value={avatar}
                />
            </label>
        </ModalWithForm>
    );
};

export default ChangeProfileDataModal;
