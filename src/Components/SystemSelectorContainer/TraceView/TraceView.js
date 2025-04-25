import React, {useContext, useEffect,useState} from "react";

import ActiveTracesContext from "../../../Providers/ActiveTracesContext";
import {TraceRow} from "./TraceRow/TraceRow";

import "./TraceView.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function TraceView () {
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);

    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        if (activeTraces) {
            const _nodes = [];
            for (const node of activeTraces) {
                _nodes.push(<TraceRow node={node} />);
            }
            setNodes([_nodes]);
        }
    }, [activeTraces]);

    return (
        <div className="tracesContainer">
            {nodes}
        </div>
    );
}
