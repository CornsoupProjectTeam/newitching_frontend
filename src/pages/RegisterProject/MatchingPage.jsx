// src/pages/RegisterProject/MatchingPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* css */
import "../RegisterProject/MatchingPage.css";

/* components */
import RegisterBox from "../../components/form/RegisterBox";
import RegisterStartBox from "../../components/form/RegisterStartBox";
import LeftPanel from "../../components/form/LeftPanel";


const MatchingPage = () => {
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [matchingInfo, setMatchingInfo] = useState({});

    useEffect(() => {
        if (location.state?.step === 2) {
            setStep(2);
            setMatchingInfo({
                matchingId: location.state.matchingId,
                password: location.state.password,
            });
        }
    }, [location.state]);

    return (
        <div className="matching-container">
            <LeftPanel />
            <div className="matching-content">
                {step === 1 && <RegisterBox onStepChange={setStep} />}
                {step === 2 && (
                    <RegisterStartBox
                        onStepChange={setStep}
                        matchingId={matchingInfo.matchingId}
                        password={matchingInfo.password}
                    />
                )}
            </div>
        </div>
    );
};

export default MatchingPage;
