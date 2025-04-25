import React, {useContext, useState, useEffect} from "react";

import PropTypes from "prop-types";

import "./TraceRow.scss";

TraceRow.propTypes = {
    node: PropTypes.object,
};

/**
 * Contains the trace node component.
 * @return {JSX.Element}
 */
export function TraceRow ({node}) {
    const [traces, setTraces] = useState([]);

    useEffect(() => {
        if (node) {
            console.log(JSON.parse(node.traces));
            setTraces(JSON.parse(node.traces));
        }
    }, [node]);

    return (
        <div className="nodeRow"></div>
    );
}
