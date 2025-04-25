import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";

import "./TraceRow.scss";

TraceRow.propTypes = {
    node: PropTypes.object,
};

/**
 * Get the delta betwen two timestamps in seconds.
 * @param {Number} start Starting timestamp
 * @param {Number} end Ending timestamp
 * @return {object}
 */
function getDurationinSeconds (start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationSec = (endDate.getTime() - startDate.getTime()) / 1000;
    return durationSec;
}

/**
 * Formats a given timestamp to a human readable form.
 * @param {Number} timestamp
 * @return {String} Formatted string representing the date.
 */
function formatTimestampToDateTime (timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Contains the trace node component.
 * @return {JSX.Element}
 */
export function TraceRow ({node}) {
    const [traces, setTraces] = useState([]);
    const [startTs, setStartTs] = useState();
    const [startProgram, setStartProgram] = useState();
    const [duration, setDuration] = useState();
    const [numberOfEvents, setNumberOfEvents] = useState();

    useEffect(() => {
        if (node) {
            node.duration = getDurationinSeconds(node.start_ts, node.end_ts);
            node.traceList = JSON.parse(node.traces);

            setStartTs(formatTimestampToDateTime(node.start_ts));
            setStartProgram(node.traceList[0].programName);
            setDuration(node.duration);
            setNumberOfEvents(node.traceList.length);
        }
    }, [node]);

    return (
        <div className="nodeRow">
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
