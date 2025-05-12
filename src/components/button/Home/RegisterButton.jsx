// components/button/Home/RegisterButton.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

/* css */
import "./RegisterButton.css";

const RegisterButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        window.open("/matching", "_blank", "width=1200,height=800");
    };

    return (
        <button className="registerhome-btn" onClick={handleClick}>
            팀 매칭 등록하기
        </button>
    );
};

export default RegisterButton;
