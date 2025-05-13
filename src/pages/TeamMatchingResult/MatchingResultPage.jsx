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
    const [date, setDate] = useState("");
    const [teamList, setTeamList] = useState([]);
    const [teamsData, setTeamsData] = useState([]);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
    const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: "" });
    const [teamMembers, setTeamMembers] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [diversityScores, setDiversityScores] = useState([]);
    const socketRef = useRef(null);

    // 선택된 팀 정보를 갱신하는 함수
    const updateTeam = (team) => {
        setTeamInfo({ teamName: `Team ${team.teamIndex + 1}`, teamId: team.teamIndex });

        const members = team.members.map((member) => ({
            name: member.name,
            affiliation: member.department || "소속 없음",
        }));
        setTeamMembers(members);

        setAverageScores([
            { label: "성실성", score: team.conscientiousnessMeanScore || 0, eval: team.conscientiousnessMeanEval || 0 },
            { label: "친화성", score: team.agreeablenessMeanScore || 0, eval: team.agreeablenessMeanEval || 0 },
        ]);

        setSimilarityScores([
            { label: "성실성", score: team.conscientiousnessSimilarityScore || 0, eval: team.conscientiousnessSimilarityEval || 0 },
            { label: "친화성", score: team.agreeablenessSimilarityScore || 0, eval: team.agreeablenessSimilarityEval || 0 },
            { label: "신경증", score: team.neuroticismSimilarityScore || 0, eval: team.neuroticismSimilarityEval || 0 },
        ]);

        setDiversityScores([
            { label: "개방성", score: team.opennessDiversityScore || 0, eval: team.opennessDiversityEval || 0 },
            { label: "외향성", score: team.extraversionDiversityScore || 0, eval: team.extraversionDiversityEval || 0 },
        ]);
    };

    // 사이드바에서 팀 클릭 시 실행
    const handleTeamSelect = (index) => {
        setSelectedTeamIndex(index);
        updateTeam(teamsData[index]);
    };

    // WebSocket 연결
    useEffect(() => {
        const matchingId = localStorage.getItem("matchingId");
        const token = localStorage.getItem("authToken");

        if (!matchingId || !token) {
            console.error("매칭 ID 또는 토큰이 없습니다.");
            return;
        }

        const wsUrl = `${process.env.REACT_APP_WS_URL}/matching/${matchingId}/team_matching_results?token=${token}`;
        console.log("WebSocket 연결 시도:", wsUrl);
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data && data.teams && data.teams.length > 0) {
                    setProjectName(`프로젝트 ${data.matchingId}`);
                    setDate(new Date().toLocaleString());

                    const teamNames = data.teams.map((_, i) => `Team ${i + 1}`);
                    setTeamList(teamNames);
                    setTeamsData(data.teams);

                    // 디폴트는 첫 번째 팀
                    setSelectedTeamIndex(0);
                    updateTeam(data.teams[0]);
                }
            } catch (error) {
                console.error("WebSocket 메시지 파싱 실패:", error);
            }
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
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
            <TeamSidebar
                projectName={projectName}
                date={date}
                maxUsers={teamMembers.length}
                teamSize={teamMembers.length}
                teamList={teamList}
                currentTeam={teamInfo.teamName}
                onTeamSelect={handleTeamSelect}
            />
            <main className="matching-content">
                <TeamInfoCard
                    teamName={teamInfo.teamName}
                    teamId={teamInfo.teamId}
                    teamIndex={selectedTeamIndex}
                    totalTeams={teamList.length}
                    members={teamMembers}
                />
                <AverageMatchingResultCard
                    scores={averageScores}
                    teamIndex={selectedTeamIndex}
                />
                <SimilarityMatchingResultCard
                    scores={similarityScores}
                    teamIndex={selectedTeamIndex}
                />
                <DiversityMatchingResultCard
                    scores={diversityScores}
                    teamIndex={selectedTeamIndex}
                />
            </main>
        </div>
    );
};

export default MatchingResultPage;