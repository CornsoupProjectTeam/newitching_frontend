// components/form/MemberBox.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* css */
import "./MemberBox.css";

/* assets */
import { ReactComponent as StartChatButton } from "../button/MemberStartButton.svg";
import ErrorPopup from "../popup/ErrorPopup";

const MemberBox = () => {
    // URL에서 urlKey를 추출하여 상태로 관리
    const { urlKey } = useParams();
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");  // 소속 상태명 변경
    const [matchingId, setMatchingId] = useState("");  // 팀매칭 아이디 상태 추가
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // URL에서 추출한 urlKey를 이용하여 프로젝트 아이디 가져오기
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${urlKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMatchingId(data.matchingId);
            })
            .catch((error) => {
                console.error("API 오류:", error);
                alert("팀 매칭 정보를 불러오는 데 실패했습니다.");
            });
    }, [urlKey]);

    // 채팅 시작 버튼 클릭 핸들러
    const handleStart = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${urlKey}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, department }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    const errorMsg = data.error || data.message || "채팅 시작에 실패했습니다.";
                    setErrorMessage(errorMsg);
                    throw new Error(errorMsg);
                }

                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    navigate(`/${urlKey}/chat`);
                } else {
                    setErrorMessage("채팅 시작에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("오류 발생:", error);
                if (!error.message.includes("채팅 시작에 실패했습니다.")) {
                    setErrorMessage("서버 연결에 실패했거나 예기치 않은 오류가 발생했습니다.");
                }
            });
    };

    return (
        <div className="member-register-box">
            <h2 className="member-register-box-title">팀 매칭을 위한 챗봇 분석 시작하기</h2>

            <div className="member-register-box-form">
                <div className="member-register-box-form-group">
                    <label className="member-register-box-label">팀 매칭 아이디</label>
                    <div className="member-register-box-readonly">{matchingId}</div>
                </div>

                <div className="member-register-box-form-group">
                    <label className="member-register-box-label">내 이름</label>
                    <input
                        type="text"
                        placeholder="실명을 입력하세요"
                        className="member-register-box-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="member-register-box-form-group">
                    <label className="member-register-box-label">소속</label>
                    <input
                        type="text"
                        placeholder="소속을 입력하세요"
                        className="member-register-box-input"
                        value={department}  // 소속 필드명 변경
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </div>

                <button className="member-register-box-start-btn" onClick={handleStart}>
                    <StartChatButton />
                </button>
            </div>
            {errorMessage && (
                <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
            )}
        </div>
    );
};

export default MemberBox;
