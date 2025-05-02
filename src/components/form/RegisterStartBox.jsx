import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RegisterStartBox.css";
import "../../components/drop-down/CustomCalender.css"; // 추가된 커스텀 스타일
import BeforeButton from "../button/RegisterMatching/BeforeButton";
import StartButton from "../button/RegisterMatching/StartButton";
import { ReactComponent as ArrowDownButton } from "../button/RegisterMatching/arrow-down.svg";

const RegisterStartBox = ({ onStepChange }) => {
    const [maxTesters, setMaxTesters] = useState("");
    const [teamSize, setTeamSize] = useState("");
    const [deadline, setDeadline] = useState(null);

    const navigate = useNavigate();

    const handleStart = () => {
        if (!maxTesters || !teamSize || !deadline) return;

        const urlKey = "testkey123";
        const matchCount = Math.floor(maxTesters / teamSize);

        navigate("/matching/register", {
            state: {
                urlKey,
                maxTesters: Number(maxTesters),
                teamSize: Number(teamSize),
                matchCount,
                deadline: deadline.toISOString().split("T")[0],
            },
        });
    };

    const handleBack = () => {
        onStepChange(1);
    };

    const validTeamSizes = () => {
        const testers = parseInt(maxTesters, 10);
        if (!testers || testers < 2) return [];
        const divisors = [];
        for (let i = 2; i <= testers; i++) {
            if (testers % i === 0) divisors.push(i);
        }
        return divisors;
    };

    const maxDate = (() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 6);
        return date;
    })();

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
                            <option key={size} value={size}>{size}명</option>
                        ))}
                    </select>
                    <ArrowDownButton className="register-start-box-arrow-icon" />
                </div>
            </div>

            <div className="register-start-box-form-group">
                <label className="register-start-box-label">마감 기한</label>
                <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    maxDate={maxDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="마감 기한을 선택하세요"
                    className="register-start-box-date"
                />
            </div>

            <div className="register-start-box-buttons">
                <button className="register-start-box-before-btn" onClick={handleBack}>
                    <BeforeButton />
                </button>
                <button className="register-start-box-start-btn" onClick={handleStart}>
                    <StartButton />
                </button>
            </div>
        </div>
    );
};

export default RegisterStartBox;
