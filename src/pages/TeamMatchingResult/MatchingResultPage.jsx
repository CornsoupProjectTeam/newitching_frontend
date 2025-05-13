import React from "react";
import { useLocation } from "react-router-dom";
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
    const resultData = location.state;

    // 결과 데이터 검증
    if (!resultData || !resultData.results || resultData.results.length === 0) {
        return (
            <div className="no-result-container">
                <Lottie animationData={noDataAnimation} loop={false} autoplay={true} style={{ width: 260, height: 260 }} />
                <h2 className="no-result-title">매칭 결과를 찾을 수 없어요.</h2>
                <a href="/matching/signin" className="retry-button">다시 시도하기</a>
            </div>
        );
    }

    const { teamSize, memberCount, results } = resultData;

    // 첫 번째 팀을 기본으로 설정
    const firstTeam = results[0] || INITIAL_TEAM_INFO;

    // 팀 클릭 시 실행
    const handleTeamSelect = (index) => {
        const selectedTeam = results[index];
        updateTeam(selectedTeam);
    };

    // 팀 정보 갱신 함수
    const updateTeam = (team) => {
        // 팀이 없거나 팀 멤버가 없는 경우 방어 코드 추가
        if (!team || !Array.isArray(team.members)) {
            console.error("유효하지 않은 팀 데이터:", team);
            return {
                teamName: "팀 정보 없음",
                teamId: -1,
                members: [],
                averageScores: [],
                similarityScores: [],
                diversityScores: [],
            };
        }

        return {
            teamName: `Team ${team.teamId}`,
            teamId: team.teamId,
            members: team.members.map((member) => ({
                name: member.name || "",
                affiliation: member.affiliation || "",
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

    const currentTeam = updateTeam(firstTeam);

    return (
        <div className="matching-layout">
            {/* 사이드바 */}
            <TeamSidebar
                projectName={`팀 매칭 ${firstTeam.teamId || ""}`}
                maxUsers={memberCount}
                teamSize={teamSize}
                teamList={results.map((team) => `Team ${team.teamId}`)}
                currentTeam={currentTeam.teamName || ""}
                onTeamSelect={handleTeamSelect}
            />
            {/* 본문 */}
            <main className="matching-content">
                {results.map((team, index) => {
                    const teamData = updateTeam(team);
                    return (
                        <div key={index}>
                            {/* 팀 정보 카드 */}
                            <TeamInfoCard
                                teamName={teamData.teamName}
                                teamId={teamData.teamId}
                                teamIndex={index}
                                totalTeams={results.length}
                                members={teamData.members}
                            />
                            {/* 평균 점수 카드 */}
                            <AverageMatchingResultCard
                                scores={teamData.averageScores}
                                teamIndex={index}
                            />
                            {/* 유사성 점수 카드 */}
                            <SimilarityMatchingResultCard
                                scores={teamData.similarityScores}
                                teamIndex={index}
                            />
                            {/* 다양성 점수 카드 */}
                            <DiversityMatchingResultCard
                                scores={teamData.diversityScores}
                                teamIndex={index}
                            />
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default MatchingResultPage;

