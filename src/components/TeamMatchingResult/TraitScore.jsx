import React from 'react';
import './TraitScore.css';
import { ReactComponent as GoldBadge } from '../../assets/images/goldBadge.svg';
import { ReactComponent as SilverBadge } from '../../assets/images/silverBadge.svg';
import { resultDescription } from '../../assets/datas/resultDescription';

const evaluationLabel = {
    3: "다소 높다",
    4: "높다"
};

const TraitScore = ({ label, score, eval: evalScore, showBadge = true }) => {
    const isGold = evalScore === 4;
    const isSilver = evalScore === 3;
    const resultLabel = evaluationLabel[evalScore];

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
                    <span className="trait-badge">
            {isGold && <GoldBadge className="badge-icon" />}
                        {isSilver && <SilverBadge className="badge-icon" />}
                        <span className="badge-label">{resultLabel}</span>
          </span>
                )}
            </div>

            {detailDescription && (
                <p className="trait-explanation">{detailDescription}</p>
            )}
        </div>
    );
};

export default TraitScore;
