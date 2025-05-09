// components/TeamMatchingResult/DiversityMatchingResultCard.jsx

import React from 'react';

/* css */
import './MatchingResultCard.css';

/* components */
import TraitScore from './TraitScore';

/* assets */
import Logo_wb from "../../assets/images/Logo_wb.svg";

const DiversityMatchingResultCard = ({ scores, teamIndex }) => {
    const visibleScores = scores.filter(score => score.eval >= 3); // 또는 scores 그대로 사용해도 OK

    return (
        <div className="result-card">
            <div className="result-header">
                <img className="result-logo" src={Logo_wb} alt="Logo" />
                <h3 className="result-card-title">다양성을 기반으로 팀이 구성됐어요!</h3>
            </div>
            <div className="result-container">
                <p className="team-number">Team {teamIndex+1} 팀원들이 팀이 된다면...</p>
                {visibleScores.map((item, index) => (
                    <TraitScore
                        key={index}
                        label={`${item.label} 다양성`}
                        score={item.score}
                        eval={item.eval}
                        teamIndex={teamIndex}
                        showBadge={true} // 다양성도 뱃지 보여줌!
                    />
                ))}
            </div>
        </div>
    );
};

export default DiversityMatchingResultCard;
