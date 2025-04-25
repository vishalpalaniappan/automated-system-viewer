import React, {useCallback, useEffect, useState} from "react";

import {
    Controls,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow
} from "@xyflow/react";
import PropTypes from "prop-types";

import {getLayoutedElements} from "./DagreLayout.js";
import {getNodesFromTrace} from "./helper.js";

import "@xyflow/react/dist/style.css";

const Flow = ({trace}) => {
    const {fitView} = useReactFlow();
    const [colorMode, setColorMode] = useState("dark");
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onChange = (evt) =>
        setColorMode(evt.target.value);

    const onLayout = useCallback(
        (direction) => {
            const layouted = getLayoutedElements(nodes, edges, {direction});

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            fitView();
        },
        [nodes, edges]
    );

    useEffect(() => {
        if (trace) {
            const flowInfo = getNodesFromTrace(trace);

            const layouted = getLayoutedElements(
                flowInfo.nodes,
                flowInfo.edges,
                {direction: "TB"}
            );

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            fitView();
        }
    }, [trace]);

    const onNodeClick = (e, node) => {
        console.log(e, node);
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            colorMode={colorMode}
            onNodeClick={onNodeClick}
            fitView
        >
            <Controls />

            <Panel position="top-right">
                <select onChange={onChange} data-testid="colormode-select">
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                    <option value="system">system</option>
                </select>
            </Panel>

            <Panel position="top-left">
                <button onClick={() => onLayout("TB")}>vertical layout</button>
                <button onClick={() => onLayout("LR")}>horizontal layout</button>
            </Panel>
        </ReactFlow>
    );
};

Flow.propTypes = {
    trace: PropTypes.array,
};

export const TraceDiagram = ({traces}) => {
    const [traceList, setTraceList] = useState();

    useEffect(() => {
        setTraceList(traces);
    }, [traces]);

    return (
        <ReactFlowProvider>
            <Flow trace={traceList} />
        </ReactFlowProvider>
    );
};

TraceDiagram.propTypes = {
    traces: PropTypes.array,
};
