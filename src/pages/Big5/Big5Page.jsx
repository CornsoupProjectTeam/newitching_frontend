// pages/Big5/Big5Page.jsx

import React, { useState, useEffect } from "react";

/* css */
import "./Big5Page.css";

/* components */
import LeftPanel from "../../components/form/LeftPanel";

/* assets */
import logo from "../../assets/images/Logo_wb.svg"; // 실제 경로에 맞춰 수정

// 점수에 따른 바 색상 설정
const getBarColor = (score) => {
    if (score >= 70) return "#FD8B3E";
    else return "#FDA265";
};

const Big5Page = () => {
    const [result, setResult] = useState({
        name: "Unknown",
        date: new Date().toLocaleString(),
        traits: [],
    });

    // API에서 Big5 성향 점수 가져오기
    useEffect(() => {
        // 멤버 ID를 URL 또는 상태로부터 가져옵니다.
        const memberId = localStorage.getItem("memberId");

        fetch(`${window.location.origin}/big5/${memberId}`)
            .then((response) => {
                if (!response.ok) throw new Error("성향 점수 조회 실패");
                return response.json();
            })
            .then((data) => {
                const traits = Object.keys(data).map((key) => ({
                    label: key,
                    score: data[key],
                }));
                setResult({
                    name: "팀원",
                    date: new Date().toLocaleString(),
                    traits: traits,
                });
            })
            .catch((error) => {
                console.error("성향 점수 조회 오류:", error.message);
                alert("성향 점수를 불러올 수 없습니다.");
            });
    }, []);

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
                                        <span className="trait-percent">{trait.score.toFixed(2)}</span>
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
