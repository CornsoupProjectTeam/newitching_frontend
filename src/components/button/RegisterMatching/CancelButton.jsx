import React from "react";
import { useNavigate } from "react-router-dom";
import "./CancelButton.css";

const CancelButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="cancel-btn" onClick={handleClick}>
            취소
        </div>
    );
};

export default CancelButton;
