// components/chat/ChatHeader.jsx

import React from "react";
import './ChatHeader.css';

/* assets */
import itchingSymbol from '../../assets/images/itchingSymbol.svg';

const ChatHeader = () => {
    // TODO: 팀 이름 동적 설정, 헤더 설명 추가
    const teamName = "콘스프";

    return (
        <div className="chat-header">
            <div className="chat-title-wrap">
                <div className="chat-logo-bg">
                    <img src={itchingSymbol} alt="로고" className="chat-logo" />
                </div>
                <div className="chat-topic">{teamName} 팀의 멤버 성향 분석하기</div>
            </div>
            <div className="chat-text">
            </div>
        </div>
    );
};

export default ChatHeader;
