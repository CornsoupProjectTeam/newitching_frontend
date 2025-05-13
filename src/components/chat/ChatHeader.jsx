// components/chat/ChatHeader.jsx

import React from "react";

/* css */
import './ChatHeader.css';

/* assets */
import itchingSymbol from '../../assets/images/itchingSymbol.svg';

const ChatHeader = ({ teamId }) =>  {

    return (
        <div className="chat-header">
            <div className="chat-title-wrap">
                <div className="chat-logo-bg">
                    <img src={itchingSymbol} alt="로고" className="chat-logo" />
                </div>
                <div className="chat-topic">{teamId} 팀의 멤버 성향 분석하기</div>
            </div>
            <div className="chat-text">
            </div>
        </div>
    );
};

export default ChatHeader;