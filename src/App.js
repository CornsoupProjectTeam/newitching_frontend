// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/MainHeader";
import Footer from "./components/footer/Footer";
import Chat from "./pages/ChatPage"

const App = () => {
  return (
        <Router>
          <MainHeader />
          <Routes>
              <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </Router>
  );
};

export default App;
