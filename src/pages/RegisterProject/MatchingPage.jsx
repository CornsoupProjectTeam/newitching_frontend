import React, { useState } from "react";
import RegisterBox from "../../components/form/RegisterBox";
import RegisterStartBox from "../../components/form/RegisterStartBox";
import LeftPanel from "../../components/form/LeftPanel";
import "../RegisterProject/MatchingPage.css";

const MatchingPage = () => {
    const [step, setStep] = useState(1);
    const [projectId, setProjectId] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="matching-container">
            <LeftPanel />
            <div className="matching-content">
                {step === 1 && (
                    <RegisterBox
                        onStepChange={setStep}
                        setProjectId={setProjectId}
                        setPassword={setPassword}
                    />
                )}
                {step === 2 && (
                    <RegisterStartBox
                        onStepChange={setStep}
                        projectId={projectId}
                        password={password}
                    />
                )}
            </div>
        </div>
    );
};

export default MatchingPage;
