import React, {useEffect, useRef, useState} from "react";

import {TraceDiagram} from "../../Components/TraceDiagram/TraceDiagram";
import systemtrace from "./systemtrace.json";

import "./FileViewer.scss";

/**
 * Renders the monaco editor and the tabs.
 * @return {JSX.Element}
 */
export function FileViewer () {
    return (
        <>
            <TraceDiagram traces={systemtrace} />
        </>
    );
}
