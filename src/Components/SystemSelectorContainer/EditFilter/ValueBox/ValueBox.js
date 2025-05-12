import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";

import ActiveTracesContext from "../../../../Providers/contexts/ActiveTracesContext";

import "react-datepicker/dist/react-datepicker.css";
import "./ValueBox.scss";

ValueBox.propTypes = {
    activeKey: PropTypes.string,
};

/**
 * Renders a box to display the values.
 * @return {JSX}
 */
export function ValueBox ({activeKey}) {
    const {activeTraces, setActiveTraces} = useRef(ActiveTracesContext);

    useEffect(() => {
        if (activeKey) {
            console.log("Selected Key:", activeKey);
        }
    }, [activeKey]);

    return (
        <div className="select-box-custom">

        </div>
    );
};

