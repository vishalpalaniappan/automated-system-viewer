import React, {useEffect, useRef} from "react";

import {Filter} from "./Filter/Filter";
import {SystemSelector} from "./SystemSelector/SystemSelector";
import {TraceView} from "./TraceView/TraceView";
import {VerticleHandle} from "./VerticleHandle/VerticleHandle";

import "./SystemSelectorContainer.scss";

/**
 * Contains the debugger accordian sections.
 * @return {JSX.Element}
 */
export function SystemSelectorContainer () {
    const systemContainerRef = useRef();
    const systemRef = useRef();
    const traceViewRef = useRef();
    const filterRef = useRef();

    const TITLE_HEIGHT = 20;

    const redrawContainers = () => {
        const height = systemContainerRef.current.clientHeight;
        systemRef.current.style.height = 150 - TITLE_HEIGHT + "px";
        filterRef.current.style.height = 100 - TITLE_HEIGHT + "px";
        traceViewRef.current.style.height = height - 250 - TITLE_HEIGHT + "px";
    };

    useEffect(() => {
        redrawContainers();
    }, []);

    return (
        <div ref={systemContainerRef} className="debug-container w-100 d-flex flex-column">
            <div className="w-100 title" style={{height: TITLE_HEIGHT + "px"}}>System Selector</div>
            <div className="section" ref={systemRef}>
                <SystemSelector />
            </div>
            <VerticleHandle topDiv={systemRef} bottomDiv={filterRef}/>
            <div className="w-100 title" style={{height: TITLE_HEIGHT + "px"}}>Filter</div>
            <div className="section" ref={filterRef}>
                <Filter />
            </div>
            <VerticleHandle topDiv={filterRef} bottomDiv={traceViewRef}/>
            <div className="w-100 title" style={{height: TITLE_HEIGHT + "px"}}>Traces</div>
            <div className="section" ref={traceViewRef}>
                <TraceView />
            </div>
        </div>
    );
}
