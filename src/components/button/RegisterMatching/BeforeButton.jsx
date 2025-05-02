import React from "react";
import { useNavigate } from "react-router-dom";
import "./BeforeButton.css";

const BeforeButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/matching");
    };

    return (
        <button className="before-btn" onClick={handleClick}>
            이전으로
        </button>
    );
};

export default BeforeButton;
