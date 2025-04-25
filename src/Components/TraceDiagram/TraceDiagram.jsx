import React, {useCallback, useContext, useEffect, useState} from "react";

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

import ActiveNodeContext from "../../Providers/ActiveNodeContext.js";
import ActiveTraceContext from "../../Providers/ActiveTraceContext.js";
import {getLayoutedElements} from "./DagreLayout.js";
import {getNodesFromTrace} from "./helper.js";

import "@xyflow/react/dist/style.css";
import "./TraceDiagram.scss";


const Flow = ({trace}) => {
    const {fitView} = useReactFlow();
    const [colorMode, setColorMode] = useState("dark");
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const {activeNode, setActiveNode}= useContext(ActiveNodeContext);

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
            // Set initial layout of nodes with a vertical layout
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
        setActiveNode(node);
    };

    const onPanelClick = (e, node) => {
        setActiveNode(node);
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            colorMode={colorMode}
            onNodeClick={onNodeClick}
            onPaneClick={onPanelClick}
            fitView
        >
            <Controls />
            
        </ReactFlow>
    );
};

Flow.propTypes = {
    trace: PropTypes.array,
};

export const TraceDiagram = ({traces}) => {
    const [traceList, setTraceList] = useState();

    const {activeTrace, setActiveTrace} = useContext(ActiveTraceContext);

    useEffect(() => {
        if (activeTrace) {
            setTraceList(JSON.parse(activeTrace.traces));
        }
    }, [activeTrace]);

    return (
        <ReactFlowProvider>
            <Flow trace={traceList} />
        </ReactFlowProvider>
    );
};

TraceDiagram.propTypes = {
    traces: PropTypes.array,
};
