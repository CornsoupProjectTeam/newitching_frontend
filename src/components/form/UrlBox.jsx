// components/form/Url.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

/* css */
import "./UrlBox.css";

/* components */
import DublicateUrlButton from "../button/RegisterMatching/DuplicateUrlButton";
import UrlNoti from "../popup/NotiPopup";

/* assets */
import emaillogo from "../../assets/images/email.svg";

const UrlBox = () => {
    const { state } = useLocation();
    const [copied, setCopied] = useState(false);

    const { urlKey, maxTesters, teamSize, matchCount, deadline } = state || {};

    const parsedDeadline = deadline ? new Date(deadline) : null;
    const formattedDeadline = parsedDeadline
        ? `${parsedDeadline.getFullYear()}년 ${parsedDeadline.getMonth() + 1}월 ${parsedDeadline.getDate()}일`
        : "";

    const handleCopy = () => {
        if (!urlKey) return;
        const url = `${window.location.origin}/${urlKey}`;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(err => {
                console.error("복사 실패:", err);
                alert("URL 복사에 실패했습니다.");
            });
        } else {
            // HTTPS 환경이 아닌 경우 대체 방법
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("복사 실패:", err);
                alert("URL 복사에 실패했습니다.");
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="url-box">
            <div className="url-box-title">
                <h2>팀 매칭 URL을 생성했습니다!</h2>
                <p>공유한 링크를 눌러서 팀원들이 바로 챗봇과 대화를 시작할 수 있어요.</p>
            </div>

            <div className="url-box-content">
                <img src={emaillogo} alt="email" className="url-box-img" />
                <div className="url-box-info">
                    <div>생성일 : {formatToday()}</div>
                    <div>최대 테스트 가능 인원 수 : {maxTesters}명</div>
                    <div>팀원 수 : {teamSize}명</div>
                    <div>AI 매칭될 팀 수 : {matchCount}개 팀</div>
                    <div>마감 기한 : {formattedDeadline}</div>
                </div>
            </div>

            <div className="url-box-btn-group">
                <button className="url-box-copy-btn" onClick={handleCopy}>
                    <DublicateUrlButton />
                </button>
            </div>

            {copied && (
                <div className="url-box-noti">
                    <UrlNoti message="링크 복사 완료! 링크를 팀원들에게 공유해보세요." />
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
