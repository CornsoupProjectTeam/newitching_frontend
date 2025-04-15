// src/pages/RegisterProject/RegisterMatch.jsx

import React from "react";
import "../../components/form/LeftPanel.css";
import "../../components/form/MatchResultSignInBox.css";
import "./MatchResultSignIn.css";

import LeftPanel from "../../components/form/LeftPanel";
import MatchResultSignInBox from "../../components/form/MatchResultSignInBox";

const MatchResultSignIn = () => {
    return (
        <div className="MatchResultSignIn-container">
            <div className="MatchResultSignIn-left">
                <LeftPanel />
            </div>
            <div className="MatchResultSignIn-right">
                <MatchResultSignInBox />
            </div>
        </div>
    );
};

export default MatchResultSignIn;
