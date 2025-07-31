import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

const ToggleSwitch = () => {
    const { handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

    return (
        <label className="toggle-switch">
            <input onChange={handleToggleSwitchChange} type="checkbox" className="toggle-switch__checkbox" />
            <div className="toggle-switch__label-container">
                <div className="toggle-switch__label toggle-switch__label-F">F</div>
                <div className="toggle-switch__label toggle-switch__label-C">C</div>
            </div>
            <div className="toggle-switch__circle-container">
                <div className="toggle-switch__circle-label toggle-switch__label-F">F</div>
                <div className="toggle-switch__circle-label toggle-switch__label-C">C</div>
            </div>
        </label>
    )
}

export default ToggleSwitch;