// src/components/layout/LeftPanel.jsx

import React from "react";
import "./LeftPanel.css";

/* assets */
import orangelogo from "../../assets/images/Orange_logo.svg";
import leftpanellogo from "../../assets/icons/LeftPanel_logo.svg";
import explainlogo from "../../assets/fonts/LeftPanel_explain.svg";

const LeftPanel = () => {
    return (
        <div className="left-panel">
            <div className="left-panel-side">
                <img src={explainlogo} alt="explainlogo" className="leftpanel-explain" />
                <img src={leftpanellogo} alt="ItchingLogo" className="itching-logo" />
                <img src={orangelogo} alt="OrangeLogo" className="orange-logo" />
            </div>
        </div>
    );
};

export default LeftPanel;
