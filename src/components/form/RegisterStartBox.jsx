import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterStartBox.css";
import BeforeButton from "../button/RegisterMatching/BeforeButton";
import StartButton from "../button/RegisterMatching/StartButton";
import { ReactComponent as ArrowDownButton } from "../button/RegisterMatching/arrow-down.svg";

const RegisterStartBox = () => {
    const [maxTesters, setMaxTesters] = useState("");
    const [teamSize, setTeamSize] = useState("");
    const [deadline, setDeadline] = useState("");

    const navigate = useNavigate();

    const handleStart = () => {
        if (!maxTesters || !teamSize || !deadline) return;

        const urlKey = "testkey123"; // 임시 하드코딩
        const matchCount = Math.floor(maxTesters / teamSize);

        navigate("/matching/register", {
            state: {
                urlKey,
                maxTesters: Number(maxTesters),
                teamSize: Number(teamSize),
                matchCount,
                deadline,
            },
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    // 1을 제외한 약수만 필터링
    const validTeamSizes = () => {
        const testers = parseInt(maxTesters, 10);
        if (!testers || testers < 2) return [];
        const divisors = [];
        for (let i = 2; i <= testers; i++) {
            if (testers % i === 0) divisors.push(i);
        }
        return divisors;
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
                    onChange={(e) => {
                        setMaxTesters(e.target.value);
                        setTeamSize("");
                    }}
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
                        <option value="" disabled>선택하세요</option>
                        {validTeamSizes().map((size) => (
                            <option key={size} value={size}>
                                {size}명
                            </option>
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

            <div className="register-start-box-form-group">
                <div className="register-box-buttons">
                    <button className="register-box-before-btn" onClick={handleBack}>
                        <BeforeButton />
                    </button>
                    <button className="register-box-start-btn" onClick={handleStart}>
                        <StartButton />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterStartBox;

function getMaxDate(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split("T")[0];
}
