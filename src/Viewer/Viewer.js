import React from "react";

import {FileViewer} from "./FileViewer/FileViewer";
import {SideContainer} from "./SideContainer/SideContainer";

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
                    <SideContainer />
                </div>
                <div className="d-flex flex-grow-1 h-100 overflow-hidden">
                    <FileViewer />
                </div>
            </div>
            <div className="status-bar-container">
            </div>
        </div>
    );
}
