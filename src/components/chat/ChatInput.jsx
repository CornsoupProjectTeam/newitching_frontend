// components/chat/ChatInput.jsx

import React, { useState } from "react";

/* css */
import "./ChatInput.css";

/* assets */
import sendBtn from "../../assets/images/sendBtn.svg";

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        onSend(message); // 외부에서 받은 콜백으로 메시지 전달
        setMessage("");
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <button type="submit" className="send-button">
                <img src={sendBtn} alt="보내기" />
            </button>
        </form>
    );
};

export default ChatInput;
