// pages/TeamMatchingResult/MatchingResultPage.css

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Lottie from "lottie-react";

/* css */
import "./MatchingResultPage.css";

/* components */
import TeamSidebar from "../../components/TeamMatchingResult/TeamSidebar";
import TeamInfoCard from "../../components/TeamMatchingResult/TeamInfoCard";
import AverageMatchingResultCard from "../../components/TeamMatchingResult/AverageMatchingResultCard";
import SimilarityMatchingResultCard from "../../components/TeamMatchingResult/SimilarityMatchingResultCard";
import DiversityMatchingResultCard from "../../components/TeamMatchingResult/DiversityMatchingResultCard";

/* lottie */
import noDataAnimation from "../../assets/lottie/no-data.json";

// 초기 상태값 상수로 분리
const INITIAL_TEAM_INFO = {
    matchingId:"",
    teamName: "",
    teamId: "",
    conscientiousnessMeanScore: 0,
    agreeablenessMeanScore: 0,
    conscientiousnessMeanEval: 0,
    agreeablenessMeanEval: 0,
    conscientiousnessSimilarityScore: 0,
    agreeablenessSimilarityScore: 0,
    neuroticismSimilarityScore: 0,
    conscientiousnessSimilarityEval: 0,
    agreeablenessSimilarityEval: 0,
    neuroticismSimilarityEval: 0,
    opennessDiversityScore: 0,
    extraversionDiversityScore: 0,
    opennessDiversityEval: 0,
    extraversionDiversityEval: 0,
};

const MatchingResultPage = () => {
    const location = useLocation();
    const { matchingId } = useParams();
    const resultData = location.state;

    const sortedResults = resultData?.results
        ? [...resultData.results].sort((a, b) => a.teamIndex - b.teamIndex)
        : [];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedTeam = sortedResults[selectedIndex];

    const handleTeamSelect = (index) => {
        setSelectedIndex(index);
    };

    const updateTeam = (team) => {
        if (!team || !Array.isArray(team.members)) {
            console.error("유효하지 않은 팀 데이터:", team);
            return {
                teamName: "팀 정보 없음",
                teamIndex: -1,
                members: [],
                averageScores: [],
                similarityScores: [],
                diversityScores: [],
            };
        }

        return {
            teamName: `Team ${team.teamIndex}`,
            teamIndex: team.teamIndex,
            members: team.members.map((member) => ({
                name: member.name || "이름 없음",
                affiliation: member.department || "소속 없음",
            })),
            averageScores: [
                { label: "성실성", score: team.conscientiousnessMeanScore || 0, eval: team.conscientiousnessMeanEval || 0 },
                { label: "친화성", score: team.agreeablenessMeanScore || 0, eval: team.agreeablenessMeanEval || 0 },
            ],
            similarityScores: [
                { label: "성실성", score: team.conscientiousnessSimilarityScore || 0, eval: team.conscientiousnessSimilarityEval || 0 },
                { label: "친화성", score: team.agreeablenessSimilarityScore || 0, eval: team.agreeablenessSimilarityEval || 0 },
                { label: "신경증", score: team.neuroticismSimilarityScore || 0, eval: team.neuroticismSimilarityEval || 0 },
            ],
            diversityScores: [
                { label: "개방성", score: team.opennessDiversityScore || 0, eval: team.opennessDiversityEval || 0 },
                { label: "외향성", score: team.extraversionDiversityScore || 0, eval: team.extraversionDiversityEval || 0 },
            ],
        };
    };

    if (!resultData || !resultData.results || resultData.results.length === 0 || !selectedTeam) {
        console.warn("매칭 결과 없음 - Raw resultData:", resultData);
        return (
            <div className="no-result-container">
                <Lottie animationData={noDataAnimation} loop={false} autoplay={true} style={{ width: 260, height: 260 }} />
                <h2 className="no-result-title">매칭 결과를 찾을 수 없어요.</h2>
                <a href="/matching/signin" className="retry-button">다시 시도하기</a>
            </div>
        );
    }

    const teamData = updateTeam(selectedTeam);
    const { teamSize, memberCount } = resultData;

    return (
        <div className="matching-layout">
            <TeamSidebar
                projectName={`${matchingId}`}
                maxUsers={memberCount}
                teamSize={teamSize}
                teamList={sortedResults.map((team, idx) => ({
                    label: `Team ${team.teamIndex}`,
                    index: idx,
                }))}
                currentTeam={`Team ${selectedTeam.teamIndex}`}
                onTeamSelect={handleTeamSelect}
            />

            <main className="matching-content">
                <TeamInfoCard
                    teamName={teamData.teamName}
                    teamId={teamData.teamIndex}
                    teamIndex={selectedIndex}
                    totalTeams={sortedResults.length}
                    members={teamData.members}
                />
                <AverageMatchingResultCard scores={teamData.averageScores} teamIndex={selectedIndex} />
                <SimilarityMatchingResultCard scores={teamData.similarityScores} teamIndex={selectedIndex} />
                <DiversityMatchingResultCard scores={teamData.diversityScores} teamIndex={selectedIndex} />
            </main>
        </div>
    );
};

export default MatchingResultPage;