import React, {useEffect, useRef} from "react";

import {SystemSelector} from "./SystemSelector/SystemSelector";
import {TraceView} from "./TraceView/TraceView";
import {VerticleHandle} from "./VerticleHandle/VerticleHandle";

import "./SystemSelectorContainer.scss";

/**
 * Contains the debugger accordian sections.
 * @return {JSX.Element}
 */
export function SystemSelectorContainer () {
    const debugContainerRef = useRef();
    const variableStackRef = useRef();
    const callStackRef = useRef();

    const TITLE_HEIGHT = 20;

    const redrawContainers = () => {
        const height = debugContainerRef.current.clientHeight;
        const containerHeight = height - 150;
        variableStackRef.current.style.height = 150 - TITLE_HEIGHT + "px";
        callStackRef.current.style.height = containerHeight - TITLE_HEIGHT + "px";
    };

    useEffect(() => {
        redrawContainers();
    }, []);

    return (
        <div ref={debugContainerRef} className="debug-container w-100 d-flex flex-column">
            <div className="w-100 title" style={{height: TITLE_HEIGHT + "px"}}>System Selector</div>
            <div className="section" ref={variableStackRef}>
                <SystemSelector />
            </div>
            <VerticleHandle topDiv={variableStackRef} bottomDiv={callStackRef}/>
            <div className="w-100 title" style={{height: TITLE_HEIGHT + "px"}}>Traces</div>
            <div className="section" ref={callStackRef}>
                <TraceView />
            </div>
        </div>
    );
}
