// src/components/footer/Footer.jsx

import React from "react";
import { useLocation, useMatch } from "react-router-dom";

import "./Footer.css";

/* assets */
import symbollogo from "../../assets/images/Footer_Logo.svg";

const Footer = () => {
    // 현재 경로를 가져옴
    const location = useLocation();

    // 숨길 경로 리스트
     const hideFooterPaths = [     ];

    // 채팅 고정 경로
    const isChatPage = location.pathname.startsWith("/chat");

    // 동적 채팅 상세 페이지가 있다면 useMatch로 처리
    const isChatDetail = useMatch("/chat/:chatId");

     const shouldHideFooter = hideFooterPaths.includes(location.pathname) || isChatPage || isChatDetail;

    if (shouldHideFooter) {
         return null;
     }
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-service">
                    <h4>잇칭</h4>
                    <ul>
                        <li>
                            <a href="/">잇칭 서비스 소개</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-page">
                    <h4>모든 기능</h4>
                    <ul>
                        <li>
                            <a href="/matching/result">팀 매칭 결과 확인하기</a>
                        </li>
                        <li>
                            <a href="/matching">팀 매칭 등록하기</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-logo">
                    <img src={symbollogo} alt="Logo" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
