// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* components */
import MainHeader from "./components/header/MainHeader";
import Footer from "./components/footer/Footer";
import Chat from "./pages/Chat/ChatPage"
import MatchingPage from "./pages/RegisterProject/MatchingPage";
import MatchingUrl from "./pages/RegisterProject/MatchingUrl";
import MemberRegister from "./components/chat/MemberRegister";
import MatchResultSignIn from "./pages/MatchResultProject/MatchResultSignIn";
import HomePage from "./pages/HomePage/HomePage";
import Big5ResultPage from "./pages/Big5/Big5Page"
import MatchingResultPage from "./pages/TeamMatchingResult/MatchingResultPage";

const App = () => {
    return (
        <Router>
            <div className="main-body">
            <MainHeader />
            <Routes>
                <Route path="/:urlKey" element={<MemberRegister />} />
                <Route path="/:urlKey/chat" element={<Chat />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/matching/register" element={<MatchingUrl />} />
                <Route path="/memberregister" element={<MemberRegister />} />
                <Route path="/matchresultsignin" element={<MatchResultSignIn />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/big5" element={<Big5ResultPage />} />
                <Route path="/matching/result" element={<MatchingResultPage />} />
            </Routes>
            <Footer />
            </div>
        </Router>
    );
};

export default App;