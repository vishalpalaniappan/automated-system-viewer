import React, {useCallback, useContext, useEffect, useState} from "react";

import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState
} from "@xyflow/react";

import FileTreeContext from "../../Providers/FileTreeContext";
import UniqueTraceContext from "../../Providers/UniqueTraceContext";

import "@xyflow/react/dist/style.css";

/**
 * SAVING FOR REFERENCE
 * const initialNodes = [
 *     {id: "hidden-1", data: {label: "Node 1"}, position: {x: 250, y: 5}},
 *     {id: "hidden-2", data: {label: "Node 2"}, position: {x: 100, y: 100}},
 *     {id: "hidden-3", data: {label: "Node 3"}, position: {x: 400, y: 100}},
 *     {id: "hidden-4", data: {label: "Node 4"}, position: {x: 400, y: 200}},
 * ];
 *
 * const initialEdges = [
 *     {id: "hidden-e1-2", source: "hidden-1", target: "hidden-2"},
 *     {id: "hidden-e1-3", source: "hidden-1", target: "hidden-3"},
 *     {id: "hidden-e3-4", source: "hidden-3", target: "hidden-4"},
 * ];
 */

const HiddenFlow = () => {
    const uniqueTraces = useContext(UniqueTraceContext);
    const fileTree = useContext(FileTreeContext);

    const [nodes, setNodes, onNodesChange] = useNodesState();
    const [edges, setEdges, onEdgesChange] = useEdgesState();

    useEffect(() => {
        if (uniqueTraces?.uniqueTrace?.nodes) {
            // setEdges(uniqueTraces.uniqueTrace.edges);
            setNodes(uniqueTraces.uniqueTrace.nodes);
        }
    }, [uniqueTraces]);

    const onConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        []
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{backgroundColor: "#F7F9FB"}}
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
};

export default HiddenFlow;
