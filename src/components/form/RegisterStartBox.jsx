import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterStartBox.css";
import { ReactComponent as BeforeButton } from "../button/BeforeButton.svg";
import { ReactComponent as StartButton } from "../button/StartButton.svg";
import { ReactComponent as ArrowDownButton } from "../button/arrow-down.svg"; // 추가

const RegisterStartBox = () => {
    const [maxTesters, setMaxTesters] = useState("");
    const [teamSize, setTeamSize] = useState("2명");
    const [deadline, setDeadline] = useState("");

    const navigate = useNavigate();

    const handleStart = () => {
        // 실제 사용 시 유효성 검사 및 navigate 실행
        console.log("시작:", { maxTesters, teamSize, deadline });
        navigate("/registerurl");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="register-start-box">
            <h2 className="register-start-box-title">팀 매칭 등록하기</h2>

            <div className="register-start-box-form-group">
                <label className="register-start-box-label">최대 테스트 가능 인원 수</label>
                <input
                    type="number"
                    min="1"
                    className="register-start-box-input"
                    placeholder="매칭에 참여할 최대 인원 수를 입력하세요."
                    value={maxTesters}
                    onChange={(e) => setMaxTesters(e.target.value)}
                />
            </div>

            <div className="register-start-box-form-group">
                <label className="register-start-box-label">팀원 수</label>
                <div className="register-start-box-select-wrapper">
                    <select
                        className="register-start-box-select"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1}>{i + 1}명</option>
                        ))}
                    </select>
                    <ArrowDownButton className="register-start-box-arrow-icon" />
                </div>
            </div>

            <div className="register-start-box-form-group">
                <label className="register-start-box-label">마감 기한</label>
                <input
                    type="date"
                    className="register-start-box-date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    max={getMaxDate(6)}
                />
            </div>

            <div className="register-box-btn-group">
                <button className="register-box-before-btn" onClick={handleBack}>
                    <BeforeButton />
                </button>
                <button className="register-box-start-btn" onClick={handleStart}>
                    <StartButton />
                </button>
            </div>
        </div>
    );
};

export default RegisterStartBox;

// 최대 6개월 후 날짜 제한
function getMaxDate(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split("T")[0];
}
