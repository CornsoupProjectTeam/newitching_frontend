// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/MainHeader";
import Footer from "./components/footer/Footer";
import Chat from "./pages/ChatPage"
import RegisterMatch from "./pages/RegisterProject/RegisterMatch";
import RegisterStart from "./pages/RegisterProject/RegisterStart";
import RegisterUrl from "./pages/RegisterProject/RegisterUrl";
import MemberRegister from "./pages/MemberRegister";
import MatchResultSignIn from "./pages/MatchResultProject/MatchResultSignIn";

const App = () => {
  return (
        <Router>
          <MainHeader />
          <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/registermatch" element={<RegisterMatch />} />
              <Route path="/registerstart" element={<RegisterStart />} />
              <Route path="/registerurl" element={<RegisterUrl />} />
              <Route path="/memberregister" element={<MemberRegister />} />
              <Route path="/matchresultsignin" element={<MatchResultSignIn />} />

          </Routes>
          <Footer />
        </Router>
  );
};

export default App;
