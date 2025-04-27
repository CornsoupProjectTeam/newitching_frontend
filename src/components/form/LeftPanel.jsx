// src/components/layout/LeftPanel.jsx

import React from "react";
import "./LeftPanel.css";

/* assets */
import orangelogo from "../../assets/images/Orange_logo.svg";
import leftpanellogo from "../../assets/images/LeftPanel_logo.svg";
import Explainlogo from "../../assets/icons/LeftPanel_explain";

const LeftPanel = () => {
    return (
        <div className="left-panel">
                <Explainlogo />
                <img src={leftpanellogo} alt="LeftPanelLogo" className="left-panel-logo" />
                <img src={orangelogo} alt="OrangeLogo" className="orange-logo" />
        </div>
    );
};

export default LeftPanel;
