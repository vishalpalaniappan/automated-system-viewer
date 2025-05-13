import React, {useEffect, useIdseState} from "react";

import PropTypes from "prop-types";
import {Check, Trash} from "react-bootstrap-icons";

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
                <select className="filterSelector" style={{width: "100%"}}>
                    {getKeys()}
                </select></td>
            <td>
                <select className="filterSelector" style={{width: "100%"}}>
                    <option>Equals</option>
                </select>
            </td>
            <td>
                <select className="filterSelector" style={{width: "100%"}}>
                    <option>User 5</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                </select>
            </td>
            <td><Trash /> <Check /></td>
        </tr>
    );
};

