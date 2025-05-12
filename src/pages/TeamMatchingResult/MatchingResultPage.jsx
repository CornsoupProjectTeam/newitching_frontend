// pages/TeamMatchingResult/MatchingResultPage.jsx

import React, { useState, useEffect, useRef } from "react";

/* css */
import "./MatchingResultPage.css";

/* components */
import TeamSidebar from "../../components/TeamMatchingResult/TeamSidebar";
import TeamInfoCard from "../../components/TeamMatchingResult/TeamInfoCard";
import AverageMatchingResultCard from "../../components/TeamMatchingResult/AverageMatchingResultCard";
import SimilarityMatchingResultCard from "../../components/TeamMatchingResult/SimilarityMatchingResultCard";
import DiversityMatchingResultCard from "../../components/TeamMatchingResult/DiversityMatchingResultCard";

const MatchingResultPage = () => {
    const [projectName, setProjectName] = useState("");
    const [teamList, setTeamList] = useState([]);
    const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: "" });
    const [teamMembers, setTeamMembers] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [diversityScores, setDiversityScores] = useState([]);
    const [date, setDate] = useState("");
    const socketRef = useRef(null);

    // WebSocket 연결 설정
    useEffect(() => {
        const matchingId = localStorage.getItem("matchingId");
        const token = localStorage.getItem("authToken");

        if (!matchingId || !token) {
            console.error("매칭 ID 또는 토큰이 없습니다. WebSocket을 연결할 수 없습니다.");
            return;
        }

        const wsUrl = `${process.env.REACT_APP_WS_URL}/matching/${matchingId}/team_matching_results?token=${token}`;
        console.log("WebSocket 연결 시도:", wsUrl);
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected for Matching Results");
        };

        socketRef.current.onmessage = (event) => {
            console.log("WebSocket raw message:", event.data);

            try {
                const data = JSON.parse(event.data);
                if (data && data.teams && data.teams.length > 0) {
                    console.log("Received team matching results:", data);

                    const firstTeam = data.teams[0];

                    // 프로젝트 이름과 날짜 설정
                    setProjectName(`프로젝트 ${data.matchingId}`);
                    setDate(new Date().toLocaleString());

                    // 팀 목록 설정
                    const teamNames = data.teams.map((team, index) => `Team ${index + 1}`);
                    setTeamList(teamNames);

                    // 첫 번째 팀 정보 설정
                    setTeamInfo({ teamName: `Team ${firstTeam.teamIndex + 1}`, teamId: firstTeam.teamIndex });

                    // 멤버 목록 설정
                    const members = firstTeam.memberIds.map((memberId) => ({
                        name: memberId,
                        affiliation: "소속 없음"  // 소속 정보가 없는 경우 기본값
                    }));
                    setTeamMembers(members);

                    // 평균 점수 설정
                    setAverageScores([
                        { label: "성실성", score: firstTeam.conscientiousnessMeanScore || 0, eval: firstTeam.conscientiousnessMeanEval || 0 },
                        { label: "친화성", score: firstTeam.agreeablenessMeanScore || 0, eval: firstTeam.agreeablenessMeanEval || 0 },
                    ]);

                    // 유사도 점수 설정
                    setSimilarityScores([
                        { label: "성실성", score: firstTeam.conscientiousnessSimilarityScore || 0, eval: firstTeam.conscientiousnessSimilarityEval || 0 },
                        { label: "친화성", score: firstTeam.agreeablenessSimilarityScore || 0, eval: firstTeam.agreeablenessSimilarityEval || 0 },
                        { label: "신경증", score: firstTeam.neuroticismSimilarityScore || 0, eval: firstTeam.neuroticismSimilarityEval || 0 },
                    ]);

                    // 다양성 점수 설정
                    setDiversityScores([
                        { label: "개방성", score: firstTeam.opennessDiversityScore || 0, eval: firstTeam.opennessDiversityEval || 0 },
                        { label: "외향성", score: firstTeam.extraversionDiversityScore || 0, eval: firstTeam.extraversionDiversityEval || 0 },
                    ]);
                }
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };

        socketRef.current.onclose = (event) => {
            console.log("WebSocket disconnected", event);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log("WebSocket connection closed.");
            }
        };
    }, []);

    return (
        <div className="matching-layout">
            {/* 사이드바 */}
            <TeamSidebar
                projectName={projectName}
                date={date}
                maxUsers={teamMembers.length}
                teamSize={teamMembers.length / teamList.length || 1}
                teamList={teamList}
                currentTeam={teamInfo.teamName}
            />
            {/* 본문 */}
            <main className="matching-content">
                <TeamInfoCard
                    teamName={teamInfo.teamName}
                    teamId={teamInfo.teamId}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                    totalTeams={teamList.length}
                    members={teamMembers}
                />
                <AverageMatchingResultCard
                    scores={averageScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
                <SimilarityMatchingResultCard
                    scores={similarityScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
                <DiversityMatchingResultCard
                    scores={diversityScores}
                    teamIndex={teamList.indexOf(teamInfo.teamName)}
                />
            </main>
        </div>
    );
};

export default MatchingResultPage;
