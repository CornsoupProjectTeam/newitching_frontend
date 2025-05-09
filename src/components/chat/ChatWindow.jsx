import React, { useState, useEffect, useRef } from "react";

/* css */
import "./ChatWindow.css";

/* components */
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    
    // TODO: 웹소켓 연결 후 로그 정리 및 디자인 점검
    useEffect(() => {
        const wsUrl = `${process.env.REACT_APP_WS_URL}?token=${process.env.REACT_APP_WS_TOKEN}`;

        if (!process.env.REACT_APP_WS_URL || !process.env.REACT_APP_WS_TOKEN) {
            console.error("환경변수가 비어있습니다. .env 파일을 확인하세요.");
            return;
        }

        console.log("WebSocket 최종 URL:", wsUrl);
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
            console.log("WebSocket raw message:", event.data);

            try {
                const data = JSON.parse(event.data);
                console.log("Parsed WebSocket message:", data);

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        memberId: "bot",
                        message: data.message || "(빈 메시지)",
                        timestamp: data.timestamp || new Date().toISOString(),
                    },
                ]);
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        socketRef.current.onclose = (event) => {
            console.log("WebSocket disconnected", event);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleSend = (text) => {
        console.log("handleSend called with text:", text);

        const timestamp = new Date().toISOString();

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                memberId: "user",
                message: text,
                timestamp,
            },
        ]);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log("Sending WebSocket message:", text);
            socketRef.current.send(
                JSON.stringify({
                    type: "chat",
                    message: text,
                    timestamp,
                })
            );
        } else {
            console.warn("WebSocket is not open, message not sent.");
        }
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
