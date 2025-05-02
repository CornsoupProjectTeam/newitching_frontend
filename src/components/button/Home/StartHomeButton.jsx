import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartHomeButton.css";

const StartHomeButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/matching");
    };

    return (
        <button className="starthomebutton-btn" onClick={handleClick}>
            지금 시작하기
        </button>
    );
};

export default StartHomeButton;
