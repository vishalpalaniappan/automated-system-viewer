import React, {useContext, useEffect, useState, useRef} from "react";

import ActiveTraceContext from "../../Providers/ActiveTraceContext";
import {VariableContainer} from "./VariableContainer/VariableStackContainer";
import {VerticleHandle} from "./VerticleHandle/VerticleHandle";

import "./VariableStackContainer.scss";

/**
 * Contains the debugger accordian sections.
 * @return {JSX.Element}
 */
export function VariableStackContainer () {
    const variableContainerRef = useRef();
    const {activeTrace, setActiveTrace} = useContext(ActiveTraceContext);

    const [traceInput, setTraceInput] = useState({});
    const [traceOutput, setTraceOutput] = useState({});

    const traceInputRef = useRef();
    const traceOutputRef = useRef();
    const nodeInputRef = useRef();
    const nodeOutputRef = useRef();

    const TITLE_HEIGHT = 20;

    const redrawContainers = () => {
        const height = variableContainerRef.current.clientHeight;
        const containerHeight = height/4;
        traceInputRef.current.style.height = containerHeight - TITLE_HEIGHT + "px";
        traceOutputRef.current.style.height = containerHeight - TITLE_HEIGHT + "px";
        nodeInputRef.current.style.height = containerHeight - TITLE_HEIGHT + "px";
        nodeOutputRef.current.style.height = containerHeight - TITLE_HEIGHT + "px";
    };

    useEffect(() => {
        redrawContainers();
    }, []);

    useEffect(() => {
        if (activeTrace) {
            const trace = JSON.parse(activeTrace.traces);
            console.log(trace);
            setTraceInput(trace[0].adliValue);
            setTraceOutput(trace[trace.length -1].adliValue);
        }
    }, [activeTrace]);

    return (
        <div ref={variableContainerRef} className="variable-container w-100 d-flex flex-column">
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>Trace Input</div>
            <div className="section" ref={traceInputRef}>
                <VariableContainer variables={traceInput}/>
            </div>
            <VerticleHandle topDiv={traceInputRef} bottomDiv={traceOutputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>Trace Output</div>
            <div className="section" ref={traceOutputRef}>
                <VariableContainer variables={traceOutput}/>
            </div>
            <VerticleHandle topDiv={traceOutputRef} bottomDiv={nodeInputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                Selected Node Input
            </div>
            <div className="section" ref={nodeInputRef}>
                <VariableContainer variables={{"a": 1}}/>
            </div>
            <VerticleHandle topDiv={nodeInputRef} bottomDiv={nodeOutputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                Selected Node Output
            </div>
            <div className="section" ref={nodeOutputRef}>
                <VariableContainer variables={{"a": 1}}/>
            </div>
        </div>
    );
}
