import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {Check, Plus, PlusCircleDotted, Trash} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

import ActiveTracesContext from "../../../../Providers/contexts/ActiveTracesContext";

import "react-datepicker/dist/react-datepicker.css";
import "./FilterRow.scss";

FilterRow.propTypes = {
    index: PropTypes.number,
    filterInfo: PropTypes.object,
};

/**
 * Renders a box to display the values.
 * @return {JSX}
 */
export function FilterRow ({index, filterInfo}) {
    const {activeTraces, setActiveTraces} = useRef(ActiveTracesContext);
    const [keys, setKeys] = useState();

    useEffect(() => {
        if (filterInfo) {
            console.log("Selected Key:", filterInfo);
        }
    }, [filterInfo]);


    const getKeys = () => {
        if (filterInfo?.filterable?.keys) {
            const _keys = [];
            filterInfo.filterable.keys.forEach((key, index) => {
                _keys.push(<option key={key}>{key}</option>);
            });
            return _keys;
        }
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <select style={{width: "100%"}}>
                    {getKeys()}
                </select></td>
            <td>
                <select style={{width: "100%"}}>
                    <option>Equals</option>
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

