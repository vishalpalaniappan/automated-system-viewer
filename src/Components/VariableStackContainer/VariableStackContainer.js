import React, {useContext, useEffect, useRef, useState} from "react";

import {BoxArrowInUpRight} from "react-bootstrap-icons";

import ActiveNodeContext from "../../Providers/ActiveNodeContext";
import ActiveTraceContext from "../../Providers/ActiveTraceContext";
import {VariableContainer} from "./VariableContainer/VariableContainer";
import {VerticleHandle} from "./VerticleHandle/VerticleHandle";

import "./VariableStackContainer.scss";

/**
 * Contains the debugger accordian sections.
 * @return {JSX.Element}
 */
export function VariableStackContainer () {
    const variableContainerRef = useRef();
    const {activeTrace, setActiveTrace} = useContext(ActiveTraceContext);
    const {activeNode, setActiveNode} = useContext(ActiveNodeContext);

    const [traceInput, setTraceInput] = useState({});
    const [traceOutput, setTraceOutput] = useState({});
    const [nodeInput, setNodeInput] = useState({});
    const [nodeOutput, setNodeOutput] = useState({});

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
        if (activeNode) {
            const node = activeNode.sourceNode;
            console.log(node);
            if (node.type == "adli_output") {
                setNodeInput({});
                setNodeOutput(node.adliValue);
            } else if (node.type == "adli_input") {
                if ("output" in node) {
                    setNodeInput(node.adliValue);
                    setNodeOutput(node.output[0].adliValue);
                } else {
                    setNodeInput(node.adliValue);
                    setNodeOutput({});
                }
            }
        } else {
            setNodeInput({});
            setNodeOutput({});
        }
    }, [activeNode]);

    useEffect(() => {
        if (activeTrace) {
            const trace = JSON.parse(activeTrace.traces);
            setTraceInput(trace[0].adliValue);
            setTraceOutput(trace[trace.length -1].adliValue);
            setNodeInput({});
            setNodeOutput({});
        }
    }, [activeTrace]);

    return (
        <div ref={variableContainerRef} className="variable-container w-100 d-flex flex-column">
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                Trace Input
            </div>
            <div className="section" ref={traceInputRef}>
                <VariableContainer type={"trace"} variables={traceInput}/>
            </div>
            <VerticleHandle topDiv={traceInputRef} bottomDiv={traceOutputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                Trace Output
            </div>
            <div className="section" ref={traceOutputRef}>
                <VariableContainer type={"trace"} variables={traceOutput}/>
            </div>
            <VerticleHandle topDiv={traceOutputRef} bottomDiv={nodeInputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                <div className="float-start">Selected Node Input</div>
                {Object.keys(nodeInput).length > 0 &&
                    <div className="float-end pe-2 linkDlv"><BoxArrowInUpRight/>
                        Open in DLV
                    </div>
                }
            </div>
            <div className="section" ref={nodeInputRef}>
                <VariableContainer type={"node"} variables={nodeInput}/>
            </div>
            <VerticleHandle topDiv={nodeInputRef} bottomDiv={nodeOutputRef}/>
            <div className="w-100 variable-title" style={{height: TITLE_HEIGHT + "px"}}>
                <div className="float-start">Selected Node Output</div>
                {Object.keys(nodeOutput).length > 0 &&
                    <div className="float-end pe-2 linkDlv" onClick={openLink(no)}>
                        <BoxArrowInUpRight/> Open in DLV
                    </div>
                }
            </div>
            <div className="section" ref={nodeOutputRef}>
                <VariableContainer type={"node"} variables={nodeOutput}/>
            </div>
        </div>
    );
}
