import React, {useCallback, useContext, useEffect, useState} from "react";

import ReactJsonView from "@microlink/react-json-view";

import FileTreeContext from "../../Providers/FileTreeContext";
import UniqueTraceContext from "../../Providers/UniqueTraceContext";

import "./TraceView.scss";

const TraceView = () => {
    const uniqueTraces = useContext(UniqueTraceContext);
    const [uniqueIds, setUniqueIds] = useState(<></>);
    const [traces, setTraces] = useState(<></>);
    const [traceJson, setTraceJson] = useState({});


    useEffect(() => {
        if (uniqueTraces?.uniqueTrace) {
            getUniqueIds(Object.keys(uniqueTraces.uniqueTrace));
        }
    }, [uniqueTraces]);

    const getUniqueIds = (ids) => {
        const options = [];
        ids.forEach((id, index) => {
            options.push(
                <option key={id} value={id} >{id}</option>
            );
        });
        setUniqueIds(options);
    };

    const selectUid = (event) => {
        console.log("Selecting UID:", uid)
        const uid = event.target.value;
        setTraceJson(uniqueTraces.uniqueTrace[uid]);
    };

    const variableStackTheme = {
        base00: "#252526",
        base01: "#ddd",
        base02: "#474747",
        base03: "#444",
        base04: "#717171",
        base05: "#444",
        base06: "#444",
        base07: "#c586c0", // keys
        base08: "#444",
        base09: "#ce9178", // String
        base0A: "rgba(70, 70, 230, 1)",
        base0B: "#ce9178",
        base0C: "rgba(70, 70, 230, 1)",
        base0D: "#bbb18c", // indent arrow
        base0E: "#bbb18c", // indent arrow
        base0F: "#a7ce8a",
    };

    return (
        <div className="d-flex flex-column h-100 p-2 trace-container">
            {uniqueTraces &&
                <>
                    <div style={{color: "white"}}>
                        Select Unique Trace:
                    </div>

                    <select onChange={selectUid} name="selectedFruit" style={{width: "100%"}}>
                        {uniqueIds}
                    </select>
                    <div className="d-flex flex-grow-1 trace-info-container">
                        <ReactJsonView
                            src={traceJson}
                            theme={variableStackTheme}
                            collapsed={1}
                            name={"traces"}
                            groupArraysAfterLength={100}
                            sortKeys={true}
                            displayDataTypes={false}
                            quotesOnKeys={true}
                            collapseStringsAfterLength={30}>
                        </ReactJsonView>
                    </div>
                </>
            }
        </div>
    );
};

export default TraceView;
