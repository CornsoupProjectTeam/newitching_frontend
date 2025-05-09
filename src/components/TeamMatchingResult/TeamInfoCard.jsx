// components/TeamMatchingResult/TeamInfoCard.jsx

import React, { useState } from 'react';
import './TeamInfoCard.css';

/* components */
import BigFiveSummary from './BigFiveSummary';

const TeamInfoCard = ({ teamName, teamId, teamIndex, totalTeams, members }) => {
    const [selectedAffil, setSelectedAffil] = useState('전체');

    const affiliations = Array.from(new Set(members.map(m => m.affiliation)));
    const filtered = selectedAffil === '전체'
        ? members
        : members.filter(m =>
            m.affiliation.localeCompare(selectedAffil, undefined, { sensitivity: 'base' }) === 0
        );

    return (
        <div className="team-card">
            {/* 팀 헤더 정보 */}
            <div className="team-header">
                <h2 className="team-title">Team {teamIndex + 1}</h2>
                <p className="team-match-info">매칭된 팀 {teamIndex + 1} / {totalTeams}</p>
            </div>

            {/* 팀 구성 전체 묶음 */}
            <div className="team-body">
                <p className="team-member-count">{teamName} 팀 구성: {members.length}명</p>

                {/* 필터 버튼 */}
                <div className="team-filter">
                    <button
                        className={selectedAffil === '전체' ? 'active' : ''}
                        onClick={() => setSelectedAffil('전체')}
                    >
                        전체 보기
                    </button>
                    {affiliations.map((affil, idx) => (
                        <button
                            key={idx}
                            className={selectedAffil === affil ? 'active' : ''}
                            onClick={() => setSelectedAffil(affil)}
                        >
                            {affil}
                        </button>
                    ))}
                </div>

                {/* 팀원 리스트 */}
                <div className="team-member-list">
                    {filtered.map((member, idx) => (
                        <div className="member-box" key={idx}>
                            <span className="member-name">{member.name}</span>
                            <span className="member-affil">{member.affiliation}</span>
                        </div>
                    ))}
                </div>
            </div>
            <BigFiveSummary />
        </div>
    );
};

export default TeamInfoCard;