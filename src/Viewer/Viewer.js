import React from "react";

import {StatusBar} from "../Components/StatusBar/StatusBar";
import {FileViewer} from "./FileViewer/FileViewer";
import {LeftSideContainer} from "./LeftSideContainer/LeftSideContainer";
import {RightSideContainer} from "./RightSideContainer/RightSideContainer";

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
                    <LeftSideContainer />
                </div>
                <div className="d-flex flex-grow-1 h-100 overflow-hidden">
                    <FileViewer />
                </div>
                <div className="d-flex h-100">
                    <RightSideContainer />
                </div>
            </div>
            <div className="status-bar-container">
                <StatusBar />
            </div>
        </div>
    );
}
