// components/chat/ChatHeader.jsx

import React from "react";
import './ChatHeader.css';

/* assets */
import itchingSymbol from '../../assets/images/itchingSymbol.svg';

const ChatHeader = () => {
    const teamName = "콘스프"; // 임의 설정
    const today = new Date();
    const formattedDate = today.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="chat-header">
            <div className="chat-title-wrap">
                <div className="chat-logo-bg">
                    <img src={itchingSymbol} alt="로고" className="chat-logo" />
                </div>
                <div className="chat-topic">{teamName} 팀의 멤버 성향 분석하기</div>
            </div>
            <div className="chat-text">
                <div className="chat-date">{formattedDate}</div>
            </div>
        </div>
    );
};

export default ChatHeader;
