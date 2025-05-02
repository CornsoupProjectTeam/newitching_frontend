import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UrlBox.css";
import DublicateUrlButton from "../button/RegisterMatching/DublicateUrlButton";
import UrlNoti from "../../assets/images/UrlNoti";
import emaillogo from "../../assets/images/email.svg";

const UrlBox = () => {
    const { state } = useLocation();
    const [copied, setCopied] = useState(false);

    const { urlKey, maxTesters, teamSize, matchCount, deadline } = state || {};

    const parsedDate = deadline ? new Date(deadline) : null;
    const year = parsedDate?.getFullYear() ?? "";
    const month = parsedDate ? parsedDate.getMonth() + 1 : "";
    const day = parsedDate?.getDate() ?? "";

    const handleCopy = () => {
        const url = `${window.location.origin}/chat/${urlKey}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="url-box">
            <div className="url-box-title">
                <h2>프로젝트 URL을 생성했습니다!</h2>
                <p>공유한 링크를 눌러서 팀원들이 바로 챗봇과 대화를 시작할 수 있어요.</p>
            </div>

            <div className="url-box-content">
                <img src={emaillogo} alt="email" className="url-box-img" />
                <div className="url-box-info">
                    <div>생성일 : {formatToday()}</div>
                    <div>최대 테스트 가능 인원 수 : {maxTesters}명</div>
                    <div>팀원 수 : {teamSize}명</div>
                    <div>AI 매칭될 팀 수 : {matchCount}개 팀</div>
                    <div>마감 기한 : {year}년 {month}월 {day}일</div>
                </div>
            </div>

            <div className="url-box-btn-group">
                <button className="url-box-copy-btn" onClick={handleCopy}>
                    <DublicateUrlButton />
                </button>
            </div>

            {copied && (
                <div className="url-box-noti">
                    <UrlNoti />
                </div>
            )}
        </div>
    );
};

export default UrlBox;

function formatToday() {
    const now = new Date();
    return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
}

function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}


