import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* css */
import "./Big5Page.css";

/* components */
import LeftPanel from "../../components/form/LeftPanel";

/* assets */
import loadingImage from "../../assets/images/itchingSymbol-orange.svg";

const getBarColor = (score) => (score >= 70 ? "#FD8B3E" : "#FDA265");

const Big5Page = () => {
    const [result, setResult] = useState(null);
    const { urlKey } = useParams();

    useEffect(() => {
        const fetchBig5Scores = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const memberId = localStorage.getItem("memberId"); // 로컬에 저장된 memberId 사용

                if (!token || !memberId) {
                    console.error("토큰 또는 멤버 ID가 없습니다.");
                    return;
                }

                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/${urlKey}/chat/results`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ memberId }),
                    }
                );

                if (!response.ok) {
                    throw new Error("성향 분석 결과를 가져오는 데 실패했습니다.");
                }

                const data = await response.json();
                console.log("Big5 데이터:", data);

                const traits = Object.keys(data.scores).map((label) => ({
                    label,
                    score: data.scores[label],
                }));

                setResult({
                    name: data.memberId,
                    date: new Date(data.timestamp).toLocaleString("ko-KR"),
                    traits,
                });

            } catch (error) {
                console.error("Error fetching Big5 scores:", error);
            }
        };

        fetchBig5Scores();
    }, [urlKey]);

    if (!result) {
        return (
            <div className="big5-page">
                <div className="custom-loader-container">
                    <img src={loadingImage} alt="loading" className="custom-loader-image" />
                    <p className="custom-loader-text">성향 분석 결과를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="big5-page">
            <LeftPanel />
            <div className="big5-window">
                <h1>{result.name}님의 성향 분석 결과</h1>
                {result.traits.map((trait) => (
                    <div key={trait.label}>
                        <p>{trait.label}</p>
                        <div
                            style={{
                                backgroundColor: getBarColor(trait.score),
                                width: `${trait.score}%`,
                            }}
                        >
                            {trait.score}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Big5Page;
