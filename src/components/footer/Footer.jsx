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
    const hideFooterPaths = [
        "/", // 홈
    ];

    // // 채팅 동적 경로 매칭 정은이가 채팅 라우터 설정후 수정예정
    // const isClientDetailsPage = useMatch(
    //     "/explore-client/details/:client_post_id"
    // );
    //
    // // 경로 숨기기 조건: 고정된 경로나 동적 경로가 포함된 경우
    // const shouldHideFooter =
    //     hideFooterPaths.includes(location.pathname) || isClientDetailsPage;
    //
    // // 조건에 맞으면 푸터를 숨김
    // if (shouldHideFooter) {
    //     return null;
    // }

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
                            <a href="/main">팀 매칭 결과 확인하기</a>
                        </li>
                        <li>
                            <a href="/explore-freelancer">프로젝트 등록하기</a>
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
