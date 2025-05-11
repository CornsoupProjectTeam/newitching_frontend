// pages/TeamMatchingResult/MatchingResultPage.jsx

import React, { useState, useEffect } from 'react';

/* css */
import './MatchingResultPage.css';

/* components */
import TeamSidebar from '../../components/TeamMatchingResult/TeamSidebar';
import TeamInfoCard from '../../components/TeamMatchingResult/TeamInfoCard';
import AverageMatchingResultCard from '../../components/TeamMatchingResult/AverageMatchingResultCard';
import SimilarityMatchingResultCard from '../../components/TeamMatchingResult/SimilarityMatchingResultCard';
import DiversityMatchingResultCard from '../../components/TeamMatchingResult/DiversityMatchingResultCard';

const MatchingResultPage = () => {
    const [projectName, setProjectName] = useState("");
    const [teamList, setTeamList] = useState([]);
    const [teamInfo, setTeamInfo] = useState({ teamName: "", teamId: "" });
    const [teamMembers, setTeamMembers] = useState([]);
    const [averageScores, setAverageScores] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [diversityScores, setDiversityScores] = useState([]);
    const [date, setDate] = useState("");

    // API 연동 - 팀 매칭 결과 조회
    useEffect(() => {
        const matchingId = localStorage.getItem("matchingId");

        if (!matchingId) {
            alert("매칭 ID가 없습니다. 다시 시도해 주세요.");
            return;
        }

        fetch(`${window.location.origin}/matching/${matchingId}/results`)
            .then((response) => {
                if (!response.ok) throw new Error("매칭 결과 조회 실패");
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) throw new Error("매칭 결과가 없습니다.");

                // 프로젝트 이름과 날짜 동적으로 설정
                setProjectName(`프로젝트 ${matchingId}`);
                setDate(new Date().toLocaleString());

                const teamNames = data.map((team) => `Team ${team.teamId}`);
                setTeamList(teamNames);

                const firstTeam = data[0];
                setTeamInfo({ teamName: `Team ${firstTeam.teamId}`, teamId: firstTeam.teamId });

                const members = firstTeam.memberNames.map((name) => {
                    const [affiliation, memberName] = name.split(" ");
                    return { name: memberName, affiliation };
                });
                setTeamMembers(members);

                setAverageScores([
                    { label: "성실성", score: firstTeam.conscientiousnessMeanScore, eval: firstTeam.conscientiousnessMeanEval },
                    { label: "친화성", score: firstTeam.agreeablenessMeanScore, eval: firstTeam.agreeablenessMeanEval },
                ]);

                setSimilarityScores([
                    { label: "성실성", score: firstTeam.conscientiousnessSimilarityScore, eval: firstTeam.conscientiousnessSimilarityEval },
                    { label: "친화성", score: firstTeam.agreeablenessSimilarityScore, eval: firstTeam.agreeablenessSimilarityEval },
                    { label: "신경증", score: firstTeam.neuroticismSimilarityScore, eval: firstTeam.neuroticismSimilarityEval },
                ]);

                setDiversityScores([
                    { label: "개방성", score: firstTeam.opennessDiversityEval, eval: 3 },
                    { label: "외향성", score: firstTeam.extraversionDiversityEval, eval: 4 },
                ]);
            })
            .catch((error) => {
                console.error("오류 발생:", error.message);
                alert("팀 매칭 결과를 불러올 수 없습니다.");
            });
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

export default MatchingResultPage