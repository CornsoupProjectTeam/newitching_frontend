// src/pages/RegisterProject/MatchingUrl.jsx

import React from "react";

/* css */
import "../../components/form/LeftPanel.css";
import "../../components/form/UrlBox.css";
import "./MatchingUrl.css";

/* components */
import LeftPanel from "../../components/form/LeftPanel";
import UrlBox from "../../components/form/UrlBox";

const MatchingUrl = () => {
    return (
        <section className="RegisterUrl-section">
            <div className="RegisterUrl-container">
                <div className="RegisterUrl-left">
                    <LeftPanel />
                </div>
                <div className="RegisterUrl-right">
                    <UrlBox />
                </div>
            </div>
        </section>
    );
};

export default MatchingUrl;
