// components/chat/ChatMessage.jsx

import React from "react";

/* css */
import "./ChatMessage.css";

/* assets */
import botImg from "../../assets/images/itchingSymbol.svg"

const ChatMessage = ({ sender, text }) => {
    const isBot = sender === "bot";

    return (
        <div className={`chat-message ${sender}`}>
            {isBot && (
                <div className="chat-profile">
                    <div className="chat-avatar-bg">
                        <img
                            className="chat-avatar"
                            src={botImg} // 봇 이미지 경로
                            alt="챗봇 프로필"
                        />
                    </div>
                    <span className="chat-name">잇칭 챗봇</span>
                </div>
            )}
            <div className="message-bubble">{text}</div>
        </div>
    );
};

export default ChatMessage;