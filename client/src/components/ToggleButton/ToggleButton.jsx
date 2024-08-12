import React, { useEffect, useState } from "react";
import "./ToggleButton.scss";
import { ChangeBannerActive } from "../../../services/bannerApi";

const ToggleButton = ({ bannerId }) => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = async () => {
        setIsOn(!isOn);

        if (bannerId != null && setIsOn) {
            await ChangeBannerActive(bannerId);
        }
    };

    if(bannerId != null){
        setIsOn(true);
    }

    console.log("banner id is : ", bannerId);

    return (
        <div className="toggle-button-container">
            <button
                className={`toggle-button ${isOn ? "on" : "off"}`}
                onClick={handleToggle}
            >
                {isOn ? "On" : "Off"}
            </button>
        </div>
    );
};

export default ToggleButton;
