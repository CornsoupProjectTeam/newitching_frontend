import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MatchResultSignInBox.css";
import "../../components/button/ResultStartButton.css";
import CancelButton from "../../components/button/RegisterMatching/CancelButton";
import ResultStartButton from "../button/ResultStartButton";

// 암호화 유틸리티 함수 임포트
import { encryptPassword } from "../../utils/cryptoUtils";

const MatchResultSignIn = () => {
    const [matchingId, setMatchingId] = useState("");
    const [password, setPassword] = useState("");
    const [matchingIdError, setMatchingIdError] = useState("");

    const navigate = useNavigate();

    const handleNextClick = async () => {
        setMatchingIdError("");

        try {
            // 비밀번호 암호화
            const encryptedPassword = encryptPassword(password);

            const resultResponse = await fetch("/matching/results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    matchingId: matchingId,
                    password: encryptedPassword, // 암호화된 비밀번호 전송
                }),
            });

            if (!resultResponse.ok) {
                const errorData = await resultResponse.json();
                throw new Error(errorData.message || "매칭 결과 요청 실패");
            }

            const resultData = await resultResponse.json();
            navigate(`/matching/${matchingId}`, { state: resultData });

        } catch (error) {
            setMatchingIdError(error.message);
        }
    };

    return (
        <div className="matchresult-container">
            <h2 className="matchresult-title">팀 매칭 결과 확인</h2>

            {/* 매칭 ID 입력 */}
            <div className="matchresult-group">
                <label className="matchresult-label">프로젝트 아이디</label>
                <div className="matchresult-input-wrapper">
                    <input
                        type="text"
                        className="matchresult-input"
                        value={matchingId}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                            setMatchingId(value);
                            setMatchingIdError("");
                        }}
                        placeholder="영어와 숫자 입력 가능"
                    />
                </div>
            </div>

            {/* 비밀번호 입력 */}
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
                {matchingIdError && <p className="matchresult-msg">{matchingIdError}</p>}
            </div>

            {/* 버튼 영역 */}
            <div className="matchresult-buttons">
                <button onClick={() => navigate("/")} className="matchresult-button">
                    <CancelButton />
                </button>
                <button onClick={handleNextClick} className="matchresult-button">
                    <ResultStartButton />
                </button>
            </div>
        </div>
    );
};

export default MatchResultSignIn;
