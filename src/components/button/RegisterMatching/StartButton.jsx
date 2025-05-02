import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartButton.css";

const BeforeButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/matching/register/url");
    };

    return (
        <button className="start-btn" onClick={handleClick}>
            시작하기
        </button>
    );
};

export default BeforeButton;
