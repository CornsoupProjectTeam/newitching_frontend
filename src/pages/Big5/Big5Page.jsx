// pages/Big5/Big5Page.jsx

import React, { useState, useEffect, useRef } from "react";

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
    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!process.env.REACT_APP_WS_URL || !token) {
            console.error("WebSocket URL 또는 토큰이 없습니다.");
            return;
        }

        const wsUrl = `${process.env.REACT_APP_WS_URL}?token=${token}`;
        console.log("WebSocket 연결 시도: ", wsUrl);

        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("Big5 WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
            console.log("WebSocket raw message:", event.data);

            try {
                const data = JSON.parse(event.data);
                if (data.scores) {
                    console.log("Received Big5 scores:", data);

                    const traits = Object.keys(data.scores).map((label) => ({
                        label,
                        score: data.scores[label],
                    }));

                    setResult({
                        name: data.memberId,
                        date: new Date(data.timestamp).toLocaleString("ko-KR"),
                        traits,
                    });

                    // WebSocket 연결 종료
                    socketRef.current.close();
                }
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        socketRef.current.onclose = (event) => {
            console.log("Big5 WebSocket disconnected", event);
        };

        socketRef.current.onerror = (error) => {
            console.error("Big5 WebSocket error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

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