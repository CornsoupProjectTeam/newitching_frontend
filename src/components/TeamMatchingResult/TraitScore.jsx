// components/TeamMatchingResult/TraitScore.jsx

import React from 'react';

/* css */
import './TraitScore.css';

/* assets */
import GoldWB from '../../assets/images/Logo_wb_gold.svg';
import SilverWB from '../../assets/images/Logo_silver_wb.svg';

/* datas */
import { resultDescription } from '../../assets/datas/resultDescription';

const evaluationLabel = {
    3: "다소 높다",
    4: "높다"
};

const TraitScore = ({ label, score, eval: evalScore, showBadge = true }) => {
    if (![3, 4].includes(evalScore)) return null;

    const isGold = evalScore === 4;
    const isSilver = evalScore === 3;

    const traitName = label.replace(/ (유사도|평균|다양성)/, '');
    const type = label.includes('유사도')
        ? '유사도'
        : label.includes('평균')
            ? '평균'
            : label.includes('다양성')
                ? '다양성'
                : '';

    const descriptionKey = `${traitName} ${type} 평가`;
    const detailDescription = resultDescription[descriptionKey]?.[evalScore];

    return (
        <div className="trait-score">
            <div className="trait-info">
                <span className="trait-label">{label}</span>

                {showBadge && (isGold || isSilver) && (
                    <span className={`trait-badge ${isGold ? "gold" : "silver"}`}>
                        <img
                            src={isGold ? GoldWB : SilverWB}
                            alt={evaluationLabel[evalScore]}
                            className="badge-icon"
                        />
                        {evaluationLabel[evalScore]}
                    </span>
                )}


                <span className="score-badge">{score}점</span>
            </div>

            {detailDescription && (
                <p className="trait-explanation">{detailDescription}</p>
            )}
        </div>
    );
};

export default TraitScore;
