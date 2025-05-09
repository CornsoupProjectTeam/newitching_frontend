// components/TeamMatchingResult/TeamSidebar.jsx

import React from 'react';

/* css */
import './TeamSidebar.css';

/* assets */
import LogoWb from '../../assets/images/Logo_wb.svg';

const TeamSidebar = ({ projectName, date, maxUsers, teamSize, teamList, currentTeam }) => {
    return (
        <aside className="matching-sidebar">
            <div className="sidebar-title">
                <h2>{projectName}의<br />AI 팀 매칭 리포트</h2>

                <div className="sidebar-meta">
                    <p>{date}</p>
                    <p>최대 테스트 가능 인원 수 : {maxUsers}명</p>
                    <p>팀원 수 : {teamSize}명</p>
                </div>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-summary">
                    <img src={LogoWb} alt="매칭 완료 아이콘" className="matching-icon" />
                    <p className="matching-count">총 {teamList.length}팀 매칭 완료</p>
                </div>

                <div className="sidebar-teamlist">
                    <ul className="team-list">
                        {teamList.map((team, idx) => (
                            <li key={idx} className={team === currentTeam ? 'active' : ''}>
                                {team}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default TeamSidebar;