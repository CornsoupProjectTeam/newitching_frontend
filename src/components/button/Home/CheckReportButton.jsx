import React from "react";
import { useNavigate } from "react-router-dom";
import "./CheckReportButton.css";

const CheckReportButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/MatchResultSignIn");
    };

    return (
        <button className="reporthome-btn" onClick={handleClick}>
            팀 매칭 리포트 확인하기
        </button>
    );
};

export default CheckReportButton;
