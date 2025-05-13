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
    const [teamsData, setTeamsData] = useState([]); // 모든 팀의 원본 데이터 저장
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
    const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: 0 });
    const [teamMembers, setTeamMembers] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [diversityScores, setDiversityScores] = useState([]);
    const socketRef = useRef(null);

    const USE_MOCK = true;

    useEffect(() => {
        if (USE_MOCK) {
            const mockData = {
                matchingId: "MOCK123",
                teams: [
                    {
                        teamIndex: 0,
                        members: [
                            { name: "홍길동", department: "A대학" },
                            { name: "김철수", department: "B회사" },
                            { name: "이영희", department: "C학교" },
                        ],
                        conscientiousnessSimilarityScore: 70,
                        conscientiousnessSimilarityEval: 3,
                        conscientiousnessMeanScore: 78,
                        conscientiousnessMeanEval: 2,
                        agreeablenessSimilarityScore: 88,
                        agreeablenessSimilarityEval: 2,
                        agreeablenessMeanScore: 82,
                        agreeablenessMeanEval: 2,
                        opennessDiversityScore: 65,
                        opennessDiversityEval: 3,
                        extraversionDiversityScore: 92,
                        extraversionDiversityEval: 2,
                        neuroticismSimilarityScore: 55,
                        neuroticismSimilarityEval: 2
                    },
                    {
                        teamIndex: 1,
                        members: [
                            { name: "박지민", department: "디자인팀" },
                            { name: "최유리", department: "기획팀" },
                            { name: "정승훈", department: "개발팀" },
                        ],
                        conscientiousnessSimilarityScore: 62,
                        conscientiousnessSimilarityEval: 2,
                        conscientiousnessMeanScore: 69,
                        conscientiousnessMeanEval: 3,
                        agreeablenessSimilarityScore: 74,
                        agreeablenessSimilarityEval: 4,
                        agreeablenessMeanScore: 77,
                        agreeablenessMeanEval: 4,
                        opennessDiversityScore: 80,
                        opennessDiversityEval: 4,
                        extraversionDiversityScore: 60,
                        extraversionDiversityEval: 3,
                        neuroticismSimilarityScore: 45,
                        neuroticismSimilarityEval: 1
                    },
                    {
                        teamIndex: 2,
                        members: [
                            { name: "오세훈", department: "전략기획팀" },
                            { name: "서지수", department: "영업부" },
                            { name: "장도윤", department: "연구소" },
                        ],
                        conscientiousnessSimilarityScore: 85,
                        conscientiousnessSimilarityEval: 5,
                        conscientiousnessMeanScore: 90,
                        conscientiousnessMeanEval: 5,
                        agreeablenessSimilarityScore: 65,
                        agreeablenessSimilarityEval: 3,
                        agreeablenessMeanScore: 68,
                        agreeablenessMeanEval: 3,
                        opennessDiversityScore: 55,
                        opennessDiversityEval: 2,
                        extraversionDiversityScore: 78,
                        extraversionDiversityEval: 4,
                        neuroticismSimilarityScore: 38,
                        neuroticismSimilarityEval: 1
                    }
                ]
            };

            setProjectName(`${mockData.matchingId}`);
            setDate(new Date().toLocaleString());
            setTeamsData(mockData.teams);
            setTeamList(mockData.teams.map((_, idx) => `Team ${idx + 1}`));
            updateTeam(mockData.teams[0]);
            return;
        }

        // 실제 WebSocket 연결 생략 (USE_MOCK이 true니까)
    }, []);

    const updateTeam = (team) => {
        setTeamInfo({ teamName: `Team ${team.teamIndex + 1}`, teamId: team.teamIndex });

        setTeamMembers(
            team.members.map((member) => ({
                name: member.name,
                affiliation: member.department || "소속 없음"
            }))
        );

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

    const handleTeamSelect = (index) => {
        setSelectedTeamIndex(index);
        updateTeam(teamsData[index]);
    };

    return (
        <section className="matching-section">
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
        </section>
    );
};

export default MatchingResultPage;