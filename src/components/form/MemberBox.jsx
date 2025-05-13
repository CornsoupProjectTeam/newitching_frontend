// components/form/MemberBox.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* css */
import "./MemberBox.css";

/* assets */
import { ReactComponent as StartChatButton } from "../button/MemberStartButton.svg";

const MemberBox = () => {
    // URL에서 urlKey를 추출하여 상태로 관리
    const { urlKey } = useParams();
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [matchingId, setMatchingId] = useState("");  // 팀매칭 아이디 상태 추가
    const navigate = useNavigate();

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
        console.log("이름:", name, "소속:", organization, "팀 아이디:", matchingId);

        // 백엔드 API로 팀 ID와 사용자 정보를 전송
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${urlKey}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                organization: organization,
            }),
        })
            .then((response) => response.json())

            .then((data) => {
                if (data.token) {
                    console.log("채팅 시작 성공:", data);
                    localStorage.setItem("authToken", data.token);
                    navigate(`/${urlKey}/chat`);
                } else {
                    console.error("채팅 시작 실패:", data.message);
                    alert("채팅 시작에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("오류 발생:", error);
                alert("서버 연결에 실패했습니다.");
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
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                </div>

                <button className="member-register-box-start-btn" onClick={handleStart}>
                    <StartChatButton />
                </button>
            </div>
        </div>
    );
};

export default MemberBox;
