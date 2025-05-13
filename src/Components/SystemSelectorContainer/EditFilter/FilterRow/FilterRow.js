import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {CheckLg, Trash} from "react-bootstrap-icons";

import "react-datepicker/dist/react-datepicker.css";
import "./FilterRow.scss";

FilterRow.propTypes = {
    index: PropTypes.number,
    filterInfo: PropTypes.object,
};

/**
 * Renders a row which lets you choose a filter.
 * @return {JSX}
 */
export function FilterRow ({index, filterInfo}) {
    const [keys, setKeys] = useState(<></>);
    const [values, setValues] = useState(<></>);

    useEffect(() => {
        if (filterInfo) {
            console.log("Selected Key:", filterInfo);
            getKeys();
            selectKey(filterInfo.filterable.keys[0]);
        }
    }, [filterInfo]);


    const getKeys = () => {
        if (filterInfo?.filterable?.keys) {
            const _keys = [];
            filterInfo.filterable.keys.forEach((key, index) => {
                _keys.push(<option key={key}>{key}</option>);
            });
            setKeys(_keys);
        }
    };

    const selectKey = (e) => {
        const key = e;
        if (filterInfo?.filterable?.values) {
            const _values = [];
            filterInfo.filterable.values[key].forEach((value, index) => {
                _values.push(
                    <option value={value} key={index}>
                        {JSON.stringify(value)}
                    </option>
                );
            });
            setValues(_values);
        }
    };

    return (
        <tr>
            <td style={{color: "grey"}}>{index + 1}</td>
            <td>
                <select
                    onChange={(e) => selectKey(e.target.value)}
                    className="filterSelector"
                    style={{width: "100%"}}>
                    {keys}
                </select></td>
            <td>
                <select className="filterSelector" style={{width: "100%"}}>
                    <option>Equals</option>
                </select>
            </td>
            <td>
                <select className="filterSelector" style={{width: "100%"}}>
                    {values}
                </select>
            </td>
            <td>
                <div className="d-flex flex-row justify-content-center">
                    <CheckLg style={{color: "#99ff70"}}/>
                    <Trash style={{color: "#ff7070"}}/>
                </div>
            </td>
        </tr>
    );
};

