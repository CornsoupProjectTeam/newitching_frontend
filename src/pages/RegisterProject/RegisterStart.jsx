// src/pages/RegisterProject/RegisterMatch.jsx

import React from "react";
import "../../components/form/LeftPanel.css";
import "../../components/form/RegisterStartBox.css";
import "./RegisterStart.css";

import LeftPanel from "../../components/form/LeftPanel";
import RegisterStartBox from "../../components/form/RegisterStartBox";

const RegisterStart = () => {
    return (
        <div className="RegisterStart-container">
            <div className="RegisterStart-left">
                <LeftPanel />
            </div>
            <div className="RegisterStart-right">
                <RegisterStartBox />
            </div>
        </div>
    );
};

export default RegisterStart;
