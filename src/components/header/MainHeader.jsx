// components/header/MainHeader.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

/* css */
import './MainHeader.css';

/* asset */
import mainHeaderLogo from '../../assets/images/itching.svg';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

function MainHeader() {
    const location = useLocation();
    const currentPath = location.pathname;

    const hiddenMenuPaths = ['/matching', '/chat', '/matching/register', '/matching/signin', '/member/register'];
    const showRightMenu = !hiddenMenuPaths.includes(currentPath);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <header className="main-header-wrapper">
            <div className="main-header">
                <div className="logo">
                    <a href="/">
                        <img src={mainHeaderLogo} alt="잇칭 메인 페이지로 이동"/>
                    </a>
                </div>

                {showRightMenu && (
                    <>
                        {/* 햄버거 메뉴 버튼 (모바일용) */}
                        <button className="menu-toggle" onClick={toggleMenu}>
                            {menuOpen ? <HiX size={30}/> : <HiOutlineMenu size={30}/>}
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
                                        href="#"
                                        className={`nav-button ${currentPath === '/matching/result/signin' ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open('/matching/signin', '_blank', 'width=1200,height=800');
                                        }}
                                    >
                                        팀 매칭 결과
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="nav-button primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open('/matching', '_blank', 'width=1200,height=800');
                                        }}
                                    >
                                        팀 매칭 등록하기
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </header>
            );
            }

            export default MainHeader;
