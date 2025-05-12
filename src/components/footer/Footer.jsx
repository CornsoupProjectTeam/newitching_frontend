// components/footer/Footer.jsx

import React from "react";
import { useLocation, useMatch } from "react-router-dom";

/* css */
import "./Footer.css";

/* assets */
import symbollogo from "../../assets/images/Footer_Logo.svg";

const Footer = () => {
    // 현재 경로를 가져옴
    const location = useLocation();

    const currentPath = location.pathname;

    // 숨길 경로 리스트
     const hideFooterPaths = ["/matching/signin", "/matching"];

    // 동적 채팅 상세 페이지가 있다면 useMatch로 처리
    const isChatPage = useMatch("/:urlKey", "/:urlKey/chat");

     const shouldHideFooter = hideFooterPaths.includes(location.pathname) || isChatPage;

    if (shouldHideFooter) {
         return null;
     }
    return (
        <footer className="footer-wrapper">
            <div className="main-footer">
                <div className="footer-logo">
                    <img src={symbollogo} alt="Logo" />
                </div>
                <div className="footer-links">
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
                                <a
                                    href="#"
                                    className={`${currentPath === '/matching/signin' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open('/matching/signin', '_blank', 'width=1200,height=800');
                                    }}
                                >팀 매칭 결과 확인하기</a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`${currentPath === '/matching' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open('/matching', '_blank', 'width=1200,height=800');
                                    }}
                                >팀 매칭 등록하기</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
