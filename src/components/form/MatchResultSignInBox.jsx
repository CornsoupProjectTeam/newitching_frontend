import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MatchResultSignInBox.css";
import "../../components/button/ResultStartButton.css"
import "../../components/button/ResultStartButton"
import CancelButton from "../../components/button/RegisterMatching/CancelButton";
import ResultStartButton from "../button/ResultStartButton";

const MatchResultSignIn = () => {
    const [projectId, setProjectId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [projectIdError, setProjectIdError] = useState("");

    const navigate = useNavigate();

    const handleNextClick = async () => {
        setProjectIdError("");
        setIsPasswordMatch(true);

        if (password !== confirmPassword) {
            setIsPasswordMatch(false);
            return;
        }

        try {
            const response = await fetch(`/api/project/${projectId}`);
            if (!response.ok) {
                throw new Error("존재하지 않는 프로젝트");
            }

            navigate("/matchresult", { state: { projectId, password } });
        } catch (error) {
            setProjectIdError("존재하지 않는 아이디입니다!");
        }
    };

    return (
        <div className="matchresult-container">
            <h2 className="matchresult-title">팀 매칭 결과 확인</h2>

            {/* 프로젝트 아이디 */}
            <div className="matchresult-group">
                <label className="matchresult-label">프로젝트 아이디</label>
                <div className="matchresult-input-wrapper">
                    <input
                        type="text"
                        className="matchresult-input"
                        value={projectId}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                            setProjectId(value);
                            setProjectIdError("");
                        }}
                        placeholder="영어와 숫자 입력 가능"
                    />
                </div>
                {projectIdError && <p className="matchresult-msg">{projectIdError}</p>}
            </div>

            {/* 비밀번호 */}
            <div className="matchresult-group">
                <label className="matchresult-label">비밀번호</label>
                <div className="matchresult-input-wrapper">
                    <input
                        type="password"
                        className="matchresult-input"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, "")
                            )
                        }
                        placeholder="영어, 숫자, 특수문자 입력 가능"
                    />
                </div>
            </div>

            {/* 버튼 */}
            <div className="matchresult-buttons">
                <button onClick={() => navigate("/")} className="matchresult-button svg-btn">
                    <CancelButton />
                </button>
                <button onClick={handleNextClick} className="matchresult-button svg-btn">
                    <ResultStartButton />
                </button>
            </div>
        </div>
    );
};

export default MatchResultSignIn;
