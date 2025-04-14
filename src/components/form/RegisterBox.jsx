import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterBox.css";
import { ReactComponent as CancelButton } from "../button/CancelButton.svg";
import { ReactComponent as DoubleCheckButton } from "../button/DoubleCheckButton.svg";
import { ReactComponent as NextButton } from "../button/NextButton.svg";

const RegisterBox = () => {
    const [projectId, setProjectId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const [isProjectIdValid, setIsProjectIdValid] = useState(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const navigate = useNavigate();

    const checkDuplicate = () => {
        if (projectId === "콘소프") {
            setIsProjectIdValid(true);
        } else {
            setIsProjectIdValid(false);
        }
        setIsDuplicateChecked(true);
    };

    const handleNextClick = () => {
        const passwordMatch = password === confirmPassword;
        setIsPasswordMatch(passwordMatch);

        if (projectId && password && passwordMatch && isProjectIdValid) {
            navigate("/registerstart");
        }
    };

    return (
        <div className="register-box">
            <h2 className="register-box-title">팀 매칭 등록하기</h2>

            <div className="register-box-form-group">
                <label className="register-box-label">프로젝트 아이디</label>
                <div className="register-box-input-group">
                    <input
                        type="text"
                        placeholder="영어와 숫자 입력 가능"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="register-box-input"
                    />
                    <button onClick={checkDuplicate} className="register-box-check-btn">
                        <DoubleCheckButton />
                    </button>
                </div>
                {isDuplicateChecked && (
                    <div
                        className={`register-box-message ${
                            isProjectIdValid ? "register-box-valid" : "register-box-invalid"
                        }`}
                    >
                        {isProjectIdValid
                            ? "사용 가능한 프로젝트 아이디입니다!"
                            : "이미 사용 중입니다. 다른 아이디를 입력해보세요!"}
                    </div>
                )}
            </div>

            <div className="register-box-form-group">
                <label className="register-box-label">비밀번호</label>
                <input
                    type="password"
                    placeholder="영어, 숫자, 특수문자 입력 가능"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-box-input"
                />
            </div>

            <div className="register-box-form-group">
                <label className="register-box-label">비밀번호 확인</label>
                <input
                    type="password"
                    placeholder="확인을 위해 다시 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="register-box-input"
                />
                {!isPasswordMatch && (
                    <div className="register-box-invalid">
                        비밀번호 불일치, 다시 입력하세요!
                    </div>
                )}
            </div>

            <div className="register-box-btn-group">
                <button className="register-box-cancel-btn">
                    <CancelButton />
                </button>
                <button className="register-box-next-btn" onClick={handleNextClick}>
                    <NextButton />
                </button>
            </div>
        </div>
    );
};

export default RegisterBox;
