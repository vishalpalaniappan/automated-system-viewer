import React, {useRef} from "react";

import PropTypes from "prop-types";
import {FiletypePy} from "react-bootstrap-icons";

import "./Tab.scss";

Tab.propTypes = {
    tabName: PropTypes.string,
};

/**
 * Renders a Tab.
 * @return {JSX.Element}
 */
export function Tab ({tabName}) {
    const tabRef = useRef();

    return (
        <div ref={tabRef} className="tab d-flex align-items-center">
            <FiletypePy className="icon"/> {tabName}
        </div>
    );
}
