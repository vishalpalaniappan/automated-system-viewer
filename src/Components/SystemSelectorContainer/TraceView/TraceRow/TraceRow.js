import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";

import ActiveTraceContext from "../../../../Providers/ActiveTraceContext.js";
import {formatTimestampToDateTime, getDurationinSeconds} from "./helper.js";

import "./TraceRow.scss";

TraceRow.propTypes = {
    node: PropTypes.object,
};


/**
 * Contains the trace node component.
 * @return {JSX.Element}
 */
export function TraceRow ({node}) {
    const [startTs, setStartTs] = useState();
    const [startProgram, setStartProgram] = useState();
    const [duration, setDuration] = useState();
    const [numberOfEvents, setNumberOfEvents] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const {activeTrace, setActiveTrace} = useContext(ActiveTraceContext);
    const [activeStyle, setActiveStyle] = useState({});

    useEffect(() => {
        if (node) {
            const duration = getDurationinSeconds(node.start_ts, node.end_ts);
            let traceList;
            try {
                traceList = JSON.parse(node.traces);
            } catch (error) {
                console.error("Failed to parse traces JSON:", error);
                traceList = [];
            }

            setStartTs(formatTimestampToDateTime(node.start_ts));
            setStartProgram(traceList.length > 0 ? traceList[0].programName : "Unknown");
            setDuration(duration);
            setNumberOfEvents(traceList.length);
        }
    }, [node]);

    const selectTrace = (e) => {
        setActiveTrace(node);
    };

    useEffect(() => {
        if (activeTrace) {
            if (activeTrace?.trace_id === node?.trace_id) {
                setActiveStyle({borderLeft: "solid 7px green"});
            } else {
                setActiveStyle({});
            }
        }
    }, [activeTrace, node]);

    return (
        <div className="nodeRow" style={activeStyle} onClick={selectTrace}>
            <div className="d-flex flex-row">
                <div >Starts at {startProgram}</div>
                <div className="flex-grow-1 text-end">{duration} Seconds</div>
            </div>
            <div className="d-flex flex-row">
                <div style={{width: "200px"}}>{startTs}</div>
                <div className="flex-grow-1 text-end">{numberOfEvents} Events</div>
            </div>

        </div>
    );
}
