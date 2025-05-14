// components/form/RegisterStartBox.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";

/* css */
import "react-datepicker/dist/react-datepicker.css";
import "./RegisterStartBox.css";
import "../../components/drop-down/CustomCalender.css";

/* components */
import BeforeButton from "../button/RegisterMatching/BeforeButton";
import StartButton from "../button/RegisterMatching/StartButton";

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderColor: "#aca5a3",
        borderRadius: "8px",
        padding: "2px",
        boxShadow: "none",
        width: "384px",
        fontSize: "14px", // 기본 글자 크기
        "&:hover": {
            borderColor: "#aca5a3",
        },
        // 모바일 반응형
        "@media (max-width: 768px)": {
            width: "284px", // 모바일 너비
            fontSize: "16px", // 모바일 글자 크기
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#FD8B3E" : "#FFFFFF",
        color: state.isFocused ? "#FFFFFF" : "#131115",
        fontSize: "14px", // 기본 글자 크기
        "&:hover": {
            backgroundColor: "#FD8B3E",
            color: "#FFFFFF",
        },
        // 모바일 반응형
        "@media (max-width: 768px)": {
            fontSize: "14px", // 모바일 글자 크기
            padding: "8px", // 선택 옵션 크기 축소
        },
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: "12px",
        overflow: "hidden",
        width: "384px",
        // 모바일 반응형
        "@media (max-width: 768px)": {
            width: "300px", // 모바일 너비
        },
        "@media (max-width: 480px)": {
            width: "240px", // 더 작은 화면 너비
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#131115",
        fontSize: "14px", // 기본 글자 크기
        // 모바일 반응형
        "@media (max-width: 768px)": {
            fontSize: "14px", // 모바일 글자 크기
        },
    }),
};

const RegisterStartBox = ({ onStepChange, matchingId, password }) => {
    const [maxTesters, setMaxTesters] = useState("");
    const [teamSize, setTeamSize] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const navigate = useNavigate();

    const handleStart = async () => {
        if (!maxTesters || !teamSize || !deadline) return;

        const memberCount = Number(maxTesters);
        const teamSizeNum = Number(teamSize.value);
        const matchCount = Math.floor(memberCount / teamSizeNum);

        const payload = {
            matchingId,
            password,
            memberCount,
            teamSize: teamSizeNum,
            deadline: deadline.toISOString(),
        };

        try {
            const response = await fetch("${process.env.REACT_APP_BACKEND_URL}/matching/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("등록 실패");
            }

            const data = await response.json();
            const { urlkey } = data;

            navigate("/matching/register", {
                state: {
                    urlKey: urlkey,
                    maxTesters: memberCount,
                    teamSize: teamSizeNum,
                    matchCount,
                    deadline: deadline.toISOString(),
                },
            });
        } catch (err) {
            console.error("등록 오류:", err);
        }
    };

    const handleBack = () => {
        onStepChange(1);
    };

    const validTeamSizes = () => {
        const testers = parseInt(maxTesters, 10);
        if (!testers || testers < 2) return [];
        const divisors = [];
        for (let i = 2; i <= testers; i++) {
            if (testers % i === 0) divisors.push({ value: i, label: `${i}명` });
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
                        setTeamSize(null);
                    }}
                />
            </div>

            <div className="register-start-box-form-group">
                <label className="register-start-box-label">팀원 수</label>
                <Select
                    styles={customStyles}
                    value={teamSize}
                    onChange={(option) => setTeamSize(option)}
                    options={validTeamSizes()}
                    placeholder="선택하세요"
                />
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
