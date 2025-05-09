// components/chat/MemberRegister.jsx

import React from "react";

/* css */
import "./MemberRegister.css";

/* components */
import LeftPanel from "../form/LeftPanel";
import MemberBox from "../form/MemberBox";

const MemberRegister = () => {
    return (
        <div className="MemberRegister-container">
            <div className="MemberRegister-left">
                <LeftPanel />
            </div>
            <div className="MemberRegister-right">
                <MemberBox />
            </div>
        </div>
    );
};

export default MemberRegister;
