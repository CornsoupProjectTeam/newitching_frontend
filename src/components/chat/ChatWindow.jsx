// components/chat/ChatWindow.jsx

import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./ChatWindow.css"

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const userId = "u123";

    const fetchBotMessages = async () => {
        const res = await fetch("http://localhost:3001/api/messages");
        const newMessages = await res.json();
        if (newMessages.length > 0) {
            setMessages(prev => [...prev, ...newMessages.map(m => ({ ...m, memberId: "bot" }))]);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchBotMessages, 1000); // 1초 간격 polling
        return () => clearInterval(interval);
    }, []);

    const handleSend = async (text) => {
        const timestamp = new Date().toISOString();
        const userMessage = {
            type: "chat",
            memberId: userId,
            message: text,
            timestamp,
        };

        // 로컬에 바로 추가
        setMessages(prev => [...prev, userMessage]);

        // Kafka Gateway로 전송
        await fetch("http://localhost:3001/api/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userMessage),
        });
    };

    return (
        <div className="chat-window">
            <div className="chat-header-wrap">
                <ChatHeader />
            </div>

            <div className="chat-body">
                <ChatMessages messages={messages} />
            </div>

            <div className="chat-input-wrap">
                <ChatInput onSend={handleSend} />
            </div>
        </div>

    );
};

export default ChatWindow;
