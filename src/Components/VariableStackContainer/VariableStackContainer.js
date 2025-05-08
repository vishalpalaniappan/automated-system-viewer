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
    const [input, setInput] = useState({});
    const [output, setOutput] = useState({});
    const [inputValue, setInputValue] = useState({});
    const [outputValue, setOutputValue] = useState({});

    const traceInputRef = useRef();
    const traceOutputRef = useRef();
    const nodeInputRef = useRef();
    const nodeOutputRef = useRef();

    const TITLE_HEIGHT = 23;

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
            if (node.type == "adli_output") {
                setInput(null);
                setOutput(node);

                setInputValue({});
                setOutputValue(node.adliValue);
            } else if (node.type == "adli_input") {
                if ("output" in node) {
                    setInput(node);
                    setOutput(node.output[0]);

                    setInputValue(node.adliValue);
                    setOutputValue(node.output[0].adliValue);
                } else {
                    setInput(node);
                    setOutput(null);

                    setInputValue(node.adliValue);
                    setOutputValue({});
                }
            }
        } else {
            setInput(null);
            setOutput(null);
            setInputValue({});
            setOutputValue({});
        }
    }, [activeNode]);

    useEffect(() => {
        if (activeTrace) {
            const trace = JSON.parse(activeTrace.traces);
            setTraceInput(trace[0].adliValue);
            setTraceOutput(trace[trace.length -1].adliValue);
            setInputValue({});
            setOutputValue({});
        }
    }, [activeTrace]);

    const getLinkDiv = (node) => {
        if (node && "logFileIndex" in node && "logFileId" in node) {
            let url = "http://localhost:3011?";
            url = url + `filePath=${node["logFileId"]}.clp.zst&`;
            url = url + `executionIndex=${node["logFileIndex"]}`;
            return <div className="float-end pe-2">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <BoxArrowInUpRight/> Open in DLV
                </a>
            </div>;
        }
    };

    const getTitleStyle = (node) => {
        if (node) {
            return {
                "backgroundColor": "#813232",
                "color": "white",
            };
        }
    };

    return (
        <div ref={variableContainerRef} className="variable-container w-100 d-flex flex-column">
            <div className="w-100 variable-title-row">
                <div className="float-start variable-title">
                    Trace Output
                </div>
            </div>
            <div className="section" ref={traceInputRef}>
                <VariableContainer type={"trace"} variables={traceInput}/>
            </div>
            <VerticleHandle topDiv={traceInputRef} bottomDiv={traceOutputRef}/>
            <div className="w-100 variable-title-row" >
                <div className="float-start variable-title">
                    Trace Output
                </div>
            </div>
            <div className="section" ref={traceOutputRef}>
                <VariableContainer type={"trace"} variables={traceOutput}/>
            </div>
            <VerticleHandle topDiv={traceOutputRef} bottomDiv={nodeInputRef}/>
            <div className="w-100 variable-title-row">
                <div className="float-start variable-title" style={getTitleStyle(input)}>
                    Selected Node Input
                </div>
                {getLinkDiv(input)}
            </div>
            <div className="section" ref={nodeInputRef}>
                <VariableContainer type={"node"} variables={inputValue}/>
            </div>
            <VerticleHandle topDiv={nodeInputRef} bottomDiv={nodeOutputRef}/>
            <div className="w-100 variable-title-row" >
                <div className="float-start variable-title" style={getTitleStyle(output)}>
                    Selected Node Output
                </div>
                {getLinkDiv(output)}
            </div>
            <div className="section" ref={nodeOutputRef}>
                <VariableContainer type={"node"} variables={outputValue}/>
            </div>
        </div>
    );
}
