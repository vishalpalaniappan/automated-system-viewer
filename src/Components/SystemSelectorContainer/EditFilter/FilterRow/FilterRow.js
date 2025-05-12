import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {Check, Plus, PlusCircleDotted, Trash} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

import ActiveTracesContext from "../../../../Providers/contexts/ActiveTracesContext";

import "react-datepicker/dist/react-datepicker.css";
import "./FilterRow.scss";

FilterRow.propTypes = {
    activeKey: PropTypes.string,
};

/**
 * Renders a box to display the values.
 * @return {JSX}
 */
export function FilterRow ({activeKey}) {
    const {activeTraces, setActiveTraces} = useRef(ActiveTracesContext);

    useEffect(() => {
        if (activeKey) {
            console.log("Selected Key:", activeKey);
        }
    }, [activeKey]);

    return (
        <tr>
            <td>1</td>
            <td>
                <select style={{width: "100%"}}>
                    <option>User</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                </select></td>
            <td>
                <select style={{width: "100%"}}>
                    <option>Equals</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                </select>
            </td>
            <td>
                <select style={{width: "100%"}}>
                    <option>User 5</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                </select>
            </td>
            <td><Trash /> <Check /></td>
        </tr>
    );
};

