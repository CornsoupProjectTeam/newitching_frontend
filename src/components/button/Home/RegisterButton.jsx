import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterButton.css";

const RegisterButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/registermatch");
    };

    return (
        <button className="registerhome-btn" onClick={handleClick}>
            팀 매칭 등록하기
        </button>
    );
};

export default RegisterButton;
