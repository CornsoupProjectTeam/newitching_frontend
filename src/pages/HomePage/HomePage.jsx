// src/pages/HomePage/HomePage.jsx

import React from "react";

/* css */
import "./HomePage.css";

/* components */
import RegisterButton from "../../components/button/Home/RegisterButton";
import CheckReportButton from "../../components/button/Home/CheckReportButton";
import CtaButton from "../../components/button/Home/StartHomeButton"

/* assets */
import OrangeLogo from "../../assets/images/Orange_logo.svg";

const HomePage = () => {
    return (
        <main className="HomePage">
            <section className="hero-section">
                <div className="hero-container">
                    <div className="text-box">
                        <p className="hero-line left">From Itching</p>
                        <p className="hero-line right">To Matching</p>
                    </div>
                    <div className={"hero-buttons"}>
                        <RegisterButton />
                        <CheckReportButton />
                    </div>
                </div>
            </section>

            <section className="intro-section">
                    <div className="logo-row">
                        <div className="logo-inner">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <img key={i} src={OrangeLogo} alt="orange logo" className="orange-logo" />
                            ))}
                        </div>
                    </div>
                    <div className="intro-text">
                        <p className="title">
                            나와 팀원 모두에게 잘 맞는
                            <br />
                            최적의 팀을 매칭해드려요.
                        </p>
                        <p className="description">
                            잇칭은 개인의 성향을 분석하여
                            <br />
                            최고의 팀워크를 이끌어내는 팀 매칭 플랫폼입니다.
                        </p>
                    </div>
            </section>

            <section className="detail-section">
                <div className="detail-container">
                    <div className="text-box">
                        <p className="title">잇칭에서 나와 가장 잘 맞는 팀원을 찾으세요</p>
                        <div className={"cta-btn"}>
                            <CtaButton />
                        </div>
                    </div>
                    <div className="text-box2">
                        <p className="description">
                            챗봇과의 대화를 통해 사용자의 성향을 분석하여 나와 가장 잘 맞는 팀원을 매칭합니다.
                            <br />
                            빅파이브 성향 데이터를 기반으로 이상적인 팀 구성을 지원하여 보다 효율적이고 조화로운
                            협업 환경을 제공합니다.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bottom-section">
            </section>
        </main>
    );
};

export default HomePage;
