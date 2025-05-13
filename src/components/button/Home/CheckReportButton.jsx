// components/button/Home/CheckReportButton.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

/* css */
import "./CheckReportButton.css";

const CheckReportButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        window.open("/matching/signin", "_blank", "width=1200,height=800");
    };

    return (
        <button className="reporthome-btn" onClick={handleClick}>
            팀 매칭 리포트 확인하기
        </button>
    );
};

export default CheckReportButton;
