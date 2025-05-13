// pages/Big5/Big5Page.jsx

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

/* css */
import "./Big5Page.css";

/* components */
import LeftPanel from "../../components/form/LeftPanel";

/* assets */
import logo from "../../assets/images/Logo_wb.svg";
import loadingImage from "../../assets/images/itchingSymbol-orange.svg";

const getBarColor = (score) => {
    if (score >= 70) return "#FD8B3E";
    else return "#FDA265";
};

const Big5Page = () => {
    const [result, setResult] = useState(null);
    const { urlKey } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("authToken이 localStorage에 없습니다.");
            return;
        }

        let memberId;
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // JWT 디코드
            memberId = payload.sub;
        } catch (e) {
            console.error("JWT 디코딩 실패:", e);
            return;
        }

        if (!urlKey || !memberId) {
            console.error("urlKey 또는 memberId 없음");
            return;
        }

        const fetchBig5Result = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${urlKey}/chat/results`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ memberId }),
                });

                if (!response.ok) {
                    throw new Error("서버에서 Big5 결과를 받지 못했습니다.");
                }

                const data = await response.json();
                console.log("Big5 API 응답:", data);

                const traits = [
                    { label: "성실성", score: Number(data.conscientiousnessScore) },
                    { label: "친화성", score: Number(data.agreeablenessScore) },
                    { label: "개방성", score: Number(data.opennessScore) },
                    { label: "외향성", score: Number(data.extraversionScore) },
                    { label: "신경성", score: Number(data.neuroticismScore) },
                ];

                const memberName = String(data.name);

                setResult({
                    name: memberName,
                    date: new Date().toLocaleString("ko-KR"),
                    traits,
                });
            } catch (err) {
                console.error("Big5 API 호출 오류:", err);
            }
        };

        fetchBig5Result();
    }, [urlKey]);

    if (!result) {
        return (
            <section className="big5-section">
                <div className="big5-page">
                    <div className="custom-loader-container">
                        <img src={loadingImage} alt="loading" className="custom-loader-image" />
                        <p className="custom-loader-text">
                            검사 결과를 불러오고 있어요<br />
                            잠시만 기다려주세요...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="big5-section">
            <div className="big5-page">
                <LeftPanel />
                <div className="big5-window">
                    <div className="big5-header">
                        <h1 className="big5-title">{result.name}님의 성향 분석 결과</h1>
                        <p className="big5-date">{result.date}</p>
                    </div>

                    <div className="big5-result-box">
                        <div className="result-title-row">
                            <img src={logo} alt="icon" className="result-icon" />
                            <p className="result-text">{result.name}님은 이런 협업 성향을 갖고 있어요.</p>
                        </div>

                        <div className="trait-list">
                            {result.traits.map((trait) => (
                                <div key={trait.label} className="trait-item">
                                    <p className="trait-label">{trait.label}</p>
                                    <div className="trait-bar-bg">
                                        <div
                                            className="trait-bar-fill"
                                            style={{
                                                width: `${trait.score}%`,
                                                backgroundColor: getBarColor(trait.score),
                                            }}
                                        >
                                            <span className="trait-percent">{trait.score}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Big5Page;