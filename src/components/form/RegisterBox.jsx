import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterBox.css";
import "../../components/button/RegisterMatching/CancelButton.css";
import "../../components/button/RegisterMatching/NextButton.css";
import "../../components/button/RegisterMatching/DoubleCheckButton.css";
import CancelButton from "../../components/button/RegisterMatching/CancelButton";
import NextButton from "../../components/button/RegisterMatching/NextButton";
import DoubleCheckButton from "../button/RegisterMatching/DoubleCheckButton";

const RegisterBox = ({ onStepChange, setProjectId, setPassword }) => {
    const [localProjectId, setLocalProjectId] = useState("");
    const [isProjectIdChecked, setIsProjectIdChecked] = useState(false);
    const [isProjectIdAvailable, setIsProjectIdAvailable] = useState(null);
    const [projectIdError, setProjectIdError] = useState("");

    const [localPassword, setLocalPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleCheckProjectId = async () => {
        if (!localProjectId.trim()) {
            setProjectIdError("매칭 아이디를 입력해주세요.");
            setIsProjectIdChecked(false);
            setIsProjectIdAvailable(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/matching/doublecheck`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId: localProjectId }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsProjectIdAvailable(data.available);
                setProjectIdError("");
            } else {
                const errorData = await response.json();
                setIsProjectIdAvailable(false);
                setProjectIdError(errorData.error || "아이디 확인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("중복 확인 실패", error);
            setIsProjectIdAvailable(false);
            setProjectIdError("네트워크 오류가 발생했습니다.");
        }

        setIsProjectIdChecked(true);
    };

    const handleNext = () => {
        const passwordMatch = localPassword === confirmPassword;
        setIsPasswordMatch(passwordMatch);
        // TODO: 중복확인
        // 중복 확인 없이 테스트용으로 바로 넘기기
        if (passwordMatch) {
            setProjectId(localProjectId);
            setPassword(localPassword);
            onStepChange(2);
        }
    };


    return (
        <div className="registerbox-container">
            <h2 className="registerbox-title">팀 매칭 등록하기</h2>

            <div className="registerbox-group">
                <label className="registerbox-label">매칭 아이디</label>
                <div className="registerbox-input-wrapper">
                    <input
                        type="text"
                        className="registerbox-input"
                        value={localProjectId}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                            setLocalProjectId(value);
                            setIsProjectIdChecked(false);
                            setIsProjectIdAvailable(null);
                            setProjectIdError("");
                        }}
                        placeholder="영어와 숫자 입력 가능"
                    />
                    <button onClick={handleCheckProjectId} className="registerbox-inline-btn">
                        <DoubleCheckButton />
                    </button>
                </div>
                <div className="registerbox-msg-area">
                    <p className={`registerbox-msg ${
                        projectIdError ? "invalid" :
                            isProjectIdChecked
                                ? isProjectIdAvailable
                                    ? "valid"
                                    : "invalid"
                                : ""
                    }`}>
                        {projectIdError ||
                            (isProjectIdChecked
                                ? isProjectIdAvailable
                                    ? "사용 가능한 프로젝트 아이디입니다!"
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
                        value={localPassword}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, "");
                            setLocalPassword(value);
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
