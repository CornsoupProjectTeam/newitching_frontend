import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* css */
import "./ChatWindow.css";

/* components */
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import NotiPopup from "../form/NotiPopup";

const ChatWindow = () => {
    const { urlKey } = useParams();
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const [teamId, setTeamId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${urlKey}/chat`)
            .then(res => res.json())
            .then(data => {
                setTeamId(data.matchingId);
            })
            .catch(err => console.error("matchingId 가져오기 실패:", err));
    }, [urlKey]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!process.env.REACT_APP_WS_URL || !token) {
            console.error("WebSocket URL 또는 토큰이 없습니다.");
            return;
        }

        const matchingId = window.location.pathname.split("/")[1];
        const wsUrl = `${process.env.REACT_APP_WS_URL}?token=${token}`;

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

                // [1] 대화 종료 시 big5 넘어가기
                if (data.type === "done") {

                    console.log("대화 종료됨. 잠시 후 BIG5 페이지로 이동합니다.");

                    // WebSocket 연결 해제
                    if (socketRef.current) {
                        socketRef.current.close();
                        console.log("WebSocket 연결 해제");
                    }

                    setTimeout(() => {
                        navigate("/:urlKey/chat/big5");
                    }, 3000);

                    return; // 빈 메시지로 추가되는 걸 막음
                }

                // [2] 메시지가 아예 없으면 추가하지 않음
                if (!data.message || data.message.trim() === "") {
                    console.warn("수신한 메시지가 비어있어 표시하지 않음.");
                    return;
                }

                // [3] 정상 메시지 처리
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        memberId: "bot",
                        message: data.message,
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
                <ChatHeader teamId={teamId} />
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
