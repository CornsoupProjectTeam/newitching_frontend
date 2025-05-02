import React from 'react';
import './MatchingResultCard.css';
import TraitScore from './TraitScore';
import Logo_wb from "../../assets/images/Logo_wb.svg";

const SimilarityMatchingResultCard = ({ scores, teamIndex }) => {
    const visibleScores = scores.filter(score => score.eval >= 3);

    return (
        <div className="result-card">
            <div className="result-header">
                <img className="result-logo" src={Logo_wb} alt="Logo" />
                <h3 className="result-card-title">유사도를 기반으로 팀이 매칭됐어요!</h3>
            </div>
            <div className="result-container">
                <p className="team-number">Team {teamIndex+1} 팀원들이 팀이 된다면...</p>
                {visibleScores.map((item, index) => (
                    <TraitScore
                        key={index}
                        label={`${item.label} 유사도`}
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

export default SimilarityMatchingResultCard;
