// components/chat/ChatWindow.jsx

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./ChatWindow.css"

const initialMessages = [
    {
        memberId: "bot",
        message: "안녕하세요! 요즘 어떻게 지내시나요?",
        timestamp: "2025-04-07T09:10:00Z"
    },
    {
        memberId: "user",
        message: "요즘 너무 피곤해요. 회사 일이 너무 많아서 밤늦게까지 일하고 있어요.",
        timestamp: "2025-04-07T09:12:35Z"
    },
    {
        memberId: "user",
        message: "게다가 날씨까지 흐려서 기분까지 좀 처지네요.",
        timestamp: "2025-04-07T09:14:00Z"
    },
    {
        memberId: "bot",
        message: "고생이 많으시네요. 이렇게 힘든 시기엔 충분한 휴식도 꼭 필요해요.",
        timestamp: "2025-04-07T09:15:50Z"
    },
    {
        memberId: "bot",
        message: "혹시 일하면서 스트레스를 해소할 수 있는 취미 같은 건 있으신가요?",
        timestamp: "2025-04-07T09:16:20Z"
    },
    {
        memberId: "user",
        message: "요즘엔 넷플릭스나 유튜브로 영상 보면서 쉬어요. 딱히 시간도 없고요.",
        timestamp: "2025-04-08T10:05:00Z"
    },
    {
        memberId: "bot",
        message: "그런 작은 휴식도 정말 중요해요. 좋아하는 콘텐츠 보면서 에너지 충전 잘 하셨으면 해요!",
        timestamp: "2025-04-08T10:06:30Z"
    },
    {
        memberId: "user",
        message: "네 감사합니다. 챗봇이랑 이야기 나누는 것만으로도 위로가 되네요.",
        timestamp: "2025-04-08T10:08:00Z"
    },
    {
        memberId: "bot",
        message: "그렇게 말씀해주셔서 저도 기뻐요 😊 언제든지 편하게 찾아주세요.",
        timestamp: "2025-04-08T10:09:15Z"
    },
    {
        memberId: "user",
        message: "요즘 일 때문에 하루하루가 너무 빠르게 지나가는 것 같아요. 정신없이 바쁘게 살다 보면 어느새 밤이더라고요.",
        timestamp: "2025-04-08T21:11:42Z"
    },
    {
        memberId: "bot",
        message: "그럴 때일수록 잠깐이라도 숨 돌릴 시간을 꼭 가지셨으면 해요. 마음의 여유가 건강에도 좋답니다.",
        timestamp: "2025-04-08T21:12:55Z"
    },
    {
        memberId: "user",
        message: "맞아요. 그래서 요즘은 아침에 일어나서 5분 정도 명상도 하고 있어요. 효과는 아직 잘 모르겠지만요.",
        timestamp: "2025-04-08T21:14:33Z"
    },
    {
        memberId: "bot",
        message: "와, 정말 좋은 습관이네요! 명상은 처음엔 효과가 바로 느껴지지 않더라도 꾸준히 하면 마음을 안정시키는 데 도움이 된다고 해요.",
        timestamp: "2025-04-08T21:15:40Z"
    }
];

// TODO: 프론트-웹소켓 연결

const ChatWindow = () => {
    const [messages, setMessages] = useState(initialMessages);

    const handleSend = (text) => {
        const now = new Date();
        const timestamp = now.toISOString();

        const lastMessage = messages[messages.length - 1];
        const lastDate = new Date(lastMessage?.timestamp).toDateString();
        const currentDate = now.toDateString();

        const newMessages = [];

        // 사용자 메시지 추가
        newMessages.push({
            memberId: "user",
            message: text,
            timestamp,
        });

        setMessages([...messages, ...newMessages]);
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
