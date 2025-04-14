// src/pages/RegisterProject/RegisterMatch.jsx

import React from "react";
import "../../components/form/LeftPanel.css";
import "../../components/form/RegisterBox.css";
import "./RegisterMatch.css";

import LeftPanel from "../../components/form/LeftPanel";
import RegisterBox from "../../components/form/RegisterBox";

const RegisterMatch = () => {
    return (
        <div className="RegisterMatch-container">
            <div className="RegisterMatch-left">
                <LeftPanel />
            </div>
            <div className="RegisterMatch-right">
                <RegisterBox />
            </div>
        </div>
    );
};

export default RegisterMatch;
