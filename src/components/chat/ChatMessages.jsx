// components/chat/ChatMessages.jsx
import React, { useEffect, useRef, useState } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

/* css */
import "./ChatMessages.css";

/* components */
import ChatMessage from "./ChatMessage";

const ChatMessages = ({ messages = [] }) => {
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    // 자동 스크롤 함수
    const scrollToBottom = () => {
        if (!isUserScrolling) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // 메시지 변경 시 자동 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 스크롤 감지
    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isAtBottom =
                container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
            setIsUserScrolling(!isAtBottom);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const renderMessagesWithDates = () => {
        const rendered = [];
        let lastDate = null;

        messages
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // 최신이 아래
            .forEach((msg, idx) => {
                const msgDate = parseISO(msg.timestamp);
                if (!lastDate || !isSameDay(msgDate, lastDate)) {
                    rendered.push(
                        <div key={`date-${idx}`} className="chat-date-float">
                            {format(msgDate, "M. d. (E)", { locale: ko })}
                        </div>
                    );
                    lastDate = msgDate;
                }

                rendered.push(
                    <ChatMessage
                        key={idx}
                        sender={msg.memberId === "bot" ? "bot" : "user"}
                        text={msg.message}
                    />
                );
            });

        return rendered;
    };

    return (
        <div className="chat-messages" ref={chatContainerRef}>
            {renderMessagesWithDates()}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;