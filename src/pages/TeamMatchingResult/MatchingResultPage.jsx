import React from 'react';
import './MatchingResultPage.css';

import TeamSidebar from '../../components/TeamMatchingResult/TeamSidebar';
import TeamInfoCard from '../../components/TeamMatchingResult/TeamInfoCard';
import AverageMatchingResultCard from '../../components/TeamMatchingResult/AverageMatchingResultCard';
import SimilarityMatchingResultCard from '../../components/TeamMatchingResult/SimilarityMatchingResultCard';
import DiversityMatchingResultCard from '../../components/TeamMatchingResult/DiversityMatchingResultCard';

const MatchingResultPage = () => {
  const projectName = "콘스프";
  const teamList = ["Team 01", "Team 02", "Team 03"];
  const teamInfo = {
    teamName: "Team 01",
    teamId: "T100007160"
  };

  const teamMembers = [
    { name: '이현우', affiliation: '금융서비스IT운영팀' },
    { name: '한나윤', affiliation: '금융서비스IT보안팀' },
    { name: '유은서', affiliation: '디지털마케팅팀' },
    { name: '서하윤', affiliation: 'UX/UI디자인팀' },
    { name: '한나윤', affiliation: '금융서비스IT보안팀' },
    { name: '유은서', affiliation: '디지털마케팅팀' },
    { name: '서하윤', affiliation: 'UX/UI디자인팀' }
  ];

  const averageScores = [
    { label: "성실성", score: 87, eval: 4 },
    { label: "친화성", score: 75, eval: 3 }
  ];

  const similarityScores = [
    { label: "성실성", score: 87, eval: 4 },
    { label: "친화성", score: 75, eval: 3 },
    { label: "신경증", score: 40, eval: 2 }
  ];

  const diversityScores = [
    { label: "개방성", score: 52, eval: 3 },
    { label: "외향성", score: 63, eval: 4 }
  ];

  return (
      <div className="matching-layout">
        {/* 사이드바 */}
        <TeamSidebar
            projectName="콘스프"
            date="2024.11.22 (월) 16:40"
            maxUsers={12}
            teamSize={4}
            teamList={["Team 01", "Team 02", "Team 03"]}
            currentTeam="Team 01"
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
