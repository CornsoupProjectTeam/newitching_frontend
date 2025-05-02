// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/MainHeader";
import Footer from "./components/footer/Footer";
import Chat from "./pages/ChatPage"
import MatchingPage from "./pages/RegisterProject/MatchingPage";
import MatchingUrl from "./pages/RegisterProject/MatchingUrl";
import MemberRegister from "./components/chat/MemberRegister";
import MatchResultSignIn from "./pages/MatchResultProject/MatchResultSignIn";
import HomePage from "./pages/HomePage";

const App = () => {
    return (
        <Router>
            <MainHeader />
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/matching/register" element={<MatchingUrl />} />
                <Route path="/memberregister" element={<MemberRegister />} />
                <Route path="/matchresultsignin" element={<MatchResultSignIn />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;