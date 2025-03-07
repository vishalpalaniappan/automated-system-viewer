import React from "react";

import "./Viewer.scss";

/**
 * Renders the Diagnostic Log Viewer.
 * @return {JSX.Element}
 */
export function Viewer () {
    return (
        <div className="viewer-container">
            <div className="menu-container"></div>
            <div className="body-container d-flex flex-row">
                <div className="d-flex h-100">
                </div>
                <div className="d-flex flex-grow-1 h-100 overflow-hidden">
                </div>
            </div>
            <div className="status-bar-container">
            </div>
        </div>
    );
}
