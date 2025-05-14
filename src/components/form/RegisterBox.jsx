// components/form/RegisterBox.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* css */
import "./RegisterBox.css";
import "../../components/button/RegisterMatching/CancelButton.css";
import "../../components/button/RegisterMatching/NextButton.css";
import "../../components/button/RegisterMatching/DoubleCheckButton.css";

/* components */
import CancelButton from "../../components/button/RegisterMatching/CancelButton";
import NextButton from "../../components/button/RegisterMatching/NextButton";
import DoubleCheckButton from "../button/RegisterMatching/DoubleCheckButton";

const RegisterBox = ({ onStepChange }) => {
    const [matchingId, setMatchingId] = useState("");
    const [isMatchingIdChecked, setIsMatchingIdChecked] = useState(false);
    const [isMatchingIdAvailable, setIsMatchingIdAvailable] = useState(null);
    const [matchingIdError, setMatchingIdError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const navigate = useNavigate();

    const handleCheckMatchingId = async () => {
        if (!matchingId.trim()) {
            setMatchingIdError("매칭 아이디를 입력해주세요.");
            setIsMatchingIdChecked(false);
            setIsMatchingIdAvailable(false);
            return;
        }

        try {
            const response = await fetch("${process.env.REACT_APP_BACKEND_URL}/matching/doublecheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ matchingId })
            });

            const data = await response.json();

            if (response.ok) {
                setIsMatchingIdAvailable(true);
                setMatchingIdError("");
            } else if (response.status === 400) {
                setIsMatchingIdAvailable(false);
                setMatchingIdError(data.message || "이미 존재하는 매칭 ID입니다.");
            } else {
                setIsMatchingIdAvailable(false);
                setMatchingIdError("알 수 없는 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("중복 확인 실패", error);
            setIsMatchingIdAvailable(false);
            setMatchingIdError("네트워크 오류가 발생했습니다.");
        }

        setIsMatchingIdChecked(true);
    };

    const handleNext = () => {
        const passwordMatch = password === confirmPassword;
        setIsPasswordMatch(passwordMatch);

        if (isMatchingIdChecked && isMatchingIdAvailable && passwordMatch) {
            navigate("/matching", {
                state: {
                    matchingId,
                    password,
                    step: 2,
                },
            });
        }
    };

    return (
        <div className="registerbox-container">
            <h2 className="registerbox-title">팀 매칭 등록하기</h2>

            <div className="registerbox-group">
                <label className="registerbox-label">팀 매칭 아이디</label>
                <div className="registerbox-input-wrapper">
                    <input
                        type="text"
                        className="registerbox-input"
                        value={matchingId}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                            setMatchingId(value);
                            setIsMatchingIdChecked(false);
                            setIsMatchingIdAvailable(null);
                            setMatchingIdError("");
                        }}
                        placeholder="영어와 숫자 입력 가능"
                    />
                    <button onClick={handleCheckMatchingId} className="registerbox-inline-btn">
                        <DoubleCheckButton />
                    </button>
                </div>
                <div className="registerbox-msg-area">
                    <p className={`registerbox-msg ${
                        matchingIdError ? "invalid" :
                            isMatchingIdChecked
                                ? isMatchingIdAvailable
                                    ? "valid"
                                    : "invalid"
                                : ""
                    }`}>
                        {matchingIdError ||
                            (isMatchingIdChecked
                                ? isMatchingIdAvailable
                                    ? "사용 가능한 매칭 아이디입니다!"
                                    : "이미 사용 중입니다. 다른 아이디를 입력해보세요!"
                                : "")}
                    </p>
                </div>
            </div>

            <div className="registerbox-group">
                <label className="registerbox-label">비밀번호</label>
                <div className="registerbox-input-wrapper">
                    <input
                        type="password"
                        className="registerbox-input"
                        value={password}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, "");
                            setPassword(value);
                        }}
                        placeholder="영어, 숫자, 특수문자 입력 가능"
                    />
                </div>
            </div>

            <div className="registerbox-group">
                <label className="registerbox-label">비밀번호 확인</label>
                <div className="registerbox-input-wrapper">
                    <input
                        type="password"
                        className="registerbox-input"
                        value={confirmPassword}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, "");
                            setConfirmPassword(value);
                            setIsPasswordMatch(true);
                        }}
                        placeholder="확인을 위해 다시 입력하세요"
                    />
                </div>
                <div className="registerbox-msg-area">
                    <p className={`registerbox-msg ${isPasswordMatch ? "" : "invalid"}`}>
                        {!isPasswordMatch ? "비밀번호 불일치, 다시 입력하세요!" : ""}
                    </p>
                </div>

                <div className="registerbox-buttons">
                    <button onClick={() => navigate("/")} className="registerbox-button svg-btn">
                        <CancelButton />
                    </button>
                    <button onClick={handleNext} className="registerbox-button svg-btn">
                        <NextButton />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterBox;
