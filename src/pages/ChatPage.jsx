// pages/ChatPage.jsx
import React from "react";

import "../components/chat/ChatWindow.css"

import ChatWindow from "../components/chat/ChatWindow";
import LeftPanel from "../components/form/LeftPanel";

const ChatPage = () => {
    return (
        <div className="chat-page">
            <LeftPanel />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;