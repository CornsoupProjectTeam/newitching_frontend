// components/popup/ErrorPopup.jsx

import React, { useEffect, useState } from "react";

/* css */
import "./ErrorPopup.css";

const ErrorPopup = ({ message, duration = 2000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="error-popup-overlay">
            <div className="error-popup">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;