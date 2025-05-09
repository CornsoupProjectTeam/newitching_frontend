// components/form/MemberBox.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";

/* css */
import "./MemberBox.css";

/* assets */
import { ReactComponent as StartChatButton } from "../button/MemberStartButton.svg";

const MemberBox = () => {
    const { projectId } = useParams(); // URL에서 팀 ID 추출
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");

    const handleStart = () => {
        console.log("이름:", name, "소속:", organization, "프로젝트:", projectId);
        // TODO: 이후 API 요청 또는 페이지 이동 로직 작성
        window.open("/chat");
    };

    return (
        <div className="member-box">
            <h2 className="member-box-title">팀 매칭을 위한 챗봇 분석 시작하기</h2>

            <div className="member-box-form">
                <div className="member-box-form-group">
                    <label className="member-box-label">프로젝트 아이디</label>
                    <div className="member-box-readonly">{projectId}</div>
                </div>

                <div className="member-box-form-group">
                    <label className="member-box-label">내 이름</label>
                    <input
                        type="text"
                        placeholder="실명을 입력하세요"
                        className="member-box-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="member-box-form-group">
                    <label className="member-box-label">소속</label>
                    <input
                        type="text"
                        placeholder="소속을 입력하세요"
                        className="member-box-input"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                </div>

                <button className="member-box-start-btn" onClick={handleStart}>
                    <StartChatButton />
                </button>
            </div>
        </div>
    );
};

export default MemberBox;
