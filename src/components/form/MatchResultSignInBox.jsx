import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MatchResultSignInBox.css";
import { ReactComponent as StartButton } from "../button/ResultStartButton.svg";
import { ReactComponent as CancelButton } from "../button/ResultCancelButton.svg";

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

        // ✅ 백엔드에 프로젝트 아이디 유효성 검사
        try {
            const response = await fetch(`/api/project/${projectId}`);
            if (!response.ok) {
                throw new Error("존재하지 않는 프로젝트");
            }

            // ✅ 모든 조건 통과시 페이지 이동
            navigate("/matchresult", { state: { projectId, password } });
        } catch (error) {
            setProjectIdError("존재하지 않는 아이디입니다!");
        }
    };

    return (
        <div className="matchresult-box">
            <h2 className="matchresult-title">팀 매칭 결과 확인하기</h2>

            <div className="matchresult-form">
                <div className="matchresult-form-group">
                    <label className="matchresult-label">프로젝트 아이디</label>
                    <input
                        type="text"
                        placeholder="프로젝트 아이디를 입력하세요"
                        className="matchresult-input"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    />
                    {projectIdError && (
                        <div className="matchresult-box-invalid">
                            {projectIdError}
                        </div>
                    )}
                </div>

                <div className="matchresult-form-group">
                    <label className="matchresult-label">비밀번호</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        className="matchresult-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="matchresult-form-group">
                    <label className="matchresult-label">비밀번호 확인</label>
                    <input
                        type="password"
                        placeholder="확인을 위해 다시 입력하세요"
                        className="matchresult-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!isPasswordMatch && (
                        <div className="matchresult-box-invalid">
                            비밀번호 불일치, 다시 입력하세요!
                        </div>
                    )}
                </div>
                <div className="matchresult-box-btn-group">
                    <button className="matchresult-box-cancel-btn" onClick={() => navigate("/home")}>
                        <CancelButton />
                    </button>
                    <button className="matchresult-box-next-btn" onClick={handleNextClick}>
                        <StartButton />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchResultSignIn;
