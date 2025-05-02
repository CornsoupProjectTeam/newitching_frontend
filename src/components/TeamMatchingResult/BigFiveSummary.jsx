// BigFiveSummary.jsx
import React from 'react';
import './BigFiveSummary.css';
import { ReactComponent as ItchingLogo } from '../../assets/images/itching_title.svg';
import { traitDescriptions } from '../../assets/datas/traitDescriptions';

const BigFiveSummary = () => {
    return (
        <div className="bigfive-summary">
            <div className="bigfive-header">
                <ItchingLogo className="itching-logo" />
                <h2 className="bigfive-title">
                    잇칭이 빅파이브 검사로<br />팀의 협업 성향을 분석했어요.
                </h2>
            </div>
            <div className="bigfive-list">
                {Object.entries(traitDescriptions).map(([title, description]) => (
                    <div className="bigfive-trait" key={title}>
                        <h3 className="trait-title">{title}</h3>
                        <p className="trait-description">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BigFiveSummary;
