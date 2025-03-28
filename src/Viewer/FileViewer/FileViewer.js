import React, {useEffect, useRef, useState} from "react";

import GridLayout from "react-grid-layout";

import CustomNodeFlow from "../../Components/Graph/Graph";
import {MonacoInstance} from "../../Components/MonacoInstance/MonacoInstance";
import TraceView from "../../Components/TraceView/TraceView";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./FileViewer.scss";
import "monaco-editor/min/vs/editor/editor.main.css";

/**
 * Renders the monaco editor and the tabs.
 * @return {JSX.Element}
 */
export function FileViewer () {
    const viewerRef = useRef();

    const [showGrid, setShowGrid] = useState(false);
    const [editorWidth, setEditorWidth] = useState();
    const [editorHeight, setEditorHeight] = useState();

    const [layout, setLayout] = useState();

    useEffect(() => {
        const updateDimensions = () => {
            if (viewerRef.current) {
                const height = viewerRef.current.getBoundingClientRect().height/4;
                const width = viewerRef.current.getBoundingClientRect().width;
                setEditorHeight(height);
                setEditorWidth(width);
            }
        };

        updateDimensions();

        setLayout([
            {i: "a", x: 0, y: 0, w: 12, h: 2},
            {i: "d", x: 0, y: 8, w: 12, h: 2},
        ]);

        setShowGrid(true);

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(viewerRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={viewerRef} className="file-view-container d-flex flex-row">
            {showGrid &&
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={editorHeight}
                    maxRows={3}
                    width={editorWidth}
                    margin={[5, 5]}
                >
                    <div key="a">
                        <CustomNodeFlow/>
                    </div>
                    <div key="d">
                        <MonacoInstance/>
                    </div>
                </GridLayout>
            }
        </div>
    );
}
