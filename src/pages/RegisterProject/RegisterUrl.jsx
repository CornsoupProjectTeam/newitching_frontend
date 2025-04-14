// src/pages/RegisterProject/RegisterMatch.jsx

import React from "react";
import "../../components/form/LeftPanel.css";
import "../../components/form/UrlBox.css";
import "./RegisterUrl.css";

import LeftPanel from "../../components/form/LeftPanel";
import UrlBox from "../../components/form/UrlBox";

const RegisterUrl = () => {
    return (
        <div className="RegisterUrl-container">
            <div className="RegisterUrl-left">
                <LeftPanel />
            </div>
            <div className="RegisterUrl-right">
                <UrlBox />
            </div>
        </div>
    );
};

export default RegisterUrl;
