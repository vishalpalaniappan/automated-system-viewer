import React, {useRef} from "react";

import Editor, {loader} from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import {Tabs} from "../Tabs/Tabs";

import "./MonacoInstance.scss";
import "monaco-editor/min/vs/editor/editor.main.css";

/**
 * Contains the monaco editor.
 * @return {JSX.Element}
 */
export function MonacoInstance () {
    // Refs
    const editorRef = useRef(null);
    const monacoRef = useRef(null);


    loader.config({monaco});

    /**
     * Called when editor is finished mounting.
     * @param {object} editor
     * @param {object} monaco
     */
    const handleEditorDidMount =(editor, monaco) => {
        monacoRef.current = monaco;
        editorRef.current = editor;
    };


    return (


        <div className="file-view-container d-flex flex-column">
            <Tabs />
            <div className="editor d-flex flex-grow-1">
                <Editor
                    defaultValue="Loading content..."
                    theme={"vs-dark"}
                    onMount={handleEditorDidMount}
                    options={{
                        "renderWhitespace": "none",
                        "wordWrap": "on",
                        "scrollBeyondLastLine": false,
                        "glyphMargin": true,
                        "readOnly": true,
                    }}
                    language="python"
                />
            </div>
        </div>
    );
}
