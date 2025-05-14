import React, {useContext, useEffect, useState} from "react";

import ActiveTraceContext from "../../../Providers/contexts/ActiveTraceContext";
import ActiveTracesContext from "../../../Providers/contexts/ActiveTracesContext";
import ActiveFilteredTracesContext from "../../../Providers/contexts/ActiveFilteredTracesContext";
import {TraceRow} from "./TraceRow/TraceRow";

import "./TraceView.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function TraceView () {
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);
    const {activeTrace, setActiveTrace} = useContext(ActiveTraceContext);
    const {activeTracesFiltered, setActiveTracesFiltered} = useContext(ActiveFilteredTracesContext);

    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        if (activeTracesFiltered) {
            console.log(activeTracesFiltered);
            const traces = activeTracesFiltered.sort(function (a, b) {
                return a.start_ts - b.start_ts;
            });
            const _nodes = [];
            for (const node of traces) {
                _nodes.push(<TraceRow key={node.trace_id} node={node} />);
            }
            setActiveTrace(traces[0]);
            setNodes([_nodes]);
        }
    }, [activeTracesFiltered]);

    return (
        <div className="tracesContainer">
            {nodes}
        </div>
    );
}
