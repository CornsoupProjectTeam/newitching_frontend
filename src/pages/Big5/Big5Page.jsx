// pages/Big5/Big5Page.jsx

import React from "react";

/* css */
import "./Big5Page.css";

/* components */
import LeftPanel from "../../components/form/LeftPanel";

/* assets  */
import logo from "../../assets/images/Logo_wb.svg"; // 실제 경로에 맞춰 수정

const getBarColor = (score) => {
    if (score >= 70) return "#FD8B3E";
    else return "#FDA265";
};

const Big5Page = () => {
    
    // TODO: 백엔드 연동
    const result = {
        name: "한나윤",
        date: "2024년 10월 28일 (월) 16:40",
        traits: [
            { label: "외향성", score: 25.66 },
            { label: "개방성", score: 75.35 },
            { label: "성실성", score: 90.4 },
            { label: "친화성", score: 87.04 },
            { label: "신경성", score: 59.41 },
        ],
    };

    return (
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
                                        <span className="trait-percent">{trait.score}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Big5Page;
