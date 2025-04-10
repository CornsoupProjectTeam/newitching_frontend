// components/MainHeader.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MainHeader.css';

/* asset */
import mainHeaderLogo from '../../assets/images/MainHeader_Logo.png';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

function MainHeader() {
    const location = useLocation();
    const currentPath = location.pathname;

    const isMobile = window.innerWidth <= 768;
    const showRightMenu = currentPath !== '/matching' || isMobile;
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <header className="main-header">
            <div className="logo">
                <a href="/">
                    <img src={mainHeaderLogo} alt="잇칭 메인 페이지로 이동" />
                </a>
            </div>

            {showRightMenu && (
                <>
                    {/* 햄버거 메뉴 버튼 (모바일용) */}
                    <button className="menu-toggle" onClick={toggleMenu}>
                        {menuOpen ? <HiX size={30} /> : <HiOutlineMenu size={30} />}
                    </button>

                    <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                        <ul className="nav-list">
                            <li>
                                <a
                                    href="/"
                                    className={`nav-button ${currentPath === '/' ? 'active' : ''}`}
                                >
                                    잇칭 홈
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/matching/result"
                                    className={`nav-button ${currentPath === '/matching/result' ? 'active' : ''}`}
                                >
                                    팀 매칭 결과
                                </a>
                            </li>
                            <li>
                                <a href="/matching" className="nav-button primary">
                                    프로젝트 등록하기
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </header>
    );
}

export default MainHeader;
