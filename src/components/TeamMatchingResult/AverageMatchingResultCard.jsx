// components/TeamMatchingResult/AverageMatchingResultCard.jsx

import React from 'react';
import './MatchingResultCard.css';

/* components */
import TraitScore from './TraitScore';

/* assets */
import Logo_wb from "../../assets/images/Logo_wb.svg";

const AverageMatchingResultCard = ({ scores, teamIndex }) => {
    const visibleScores = scores.filter(score => score.eval >= 3);

    // 표시할 성향이 없다면 전체 컴포넌트 렌더링하지 않음
    if (visibleScores.length === 0) return null;

    return (
        <div className="result-card">
            <div className="result-header">
                <img className="result-logo" src={Logo_wb} alt="Logo" />
                <h3 className="result-card-title">평균 성향을 기반으로 분석했어요!</h3>
            </div>
            <div className="result-container">
                <p className="team-number">Team {teamIndex + 1} 팀원들이 팀이 된다면...</p>
                {visibleScores.map((item, index) => (
                    <TraitScore
                        key={index}
                        label={`${item.label} 평균`}
                        score={item.score}
                        eval={item.eval}
                        teamIndex={teamIndex}
                        showTitle={index === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default AverageMatchingResultCard;