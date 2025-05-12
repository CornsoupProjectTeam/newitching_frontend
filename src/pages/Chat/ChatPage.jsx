// pages/Chat/ChatPage.jsx

import React from "react";

/* css */
import "../../components/chat/ChatWindow.css"

/* components */
import ChatWindow from "../../components/chat/ChatWindow";
import LeftPanel from "../../components/form/LeftPanel";

const ChatPage = () => {
    return (
        <section className="chat-section">
            <div className="chat-page">
                <LeftPanel />
                <ChatWindow />
            </div>
        </section>
    );
};

export default ChatPage;