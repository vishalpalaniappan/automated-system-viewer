import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {CheckLg, Trash} from "react-bootstrap-icons";

import "react-datepicker/dist/react-datepicker.css";
import "./FilterRow.scss";

FilterRow.propTypes = {
    index: PropTypes.number,
    filterInfo: PropTypes.object,
    onSaveFilter: PropTypes.func,
    onDeleteFilter: PropTypes.func,
};

/**
 * Renders a row which lets you choose a filter.
 * @return {JSX}
 */
export function FilterRow ({index, filterInfo, onSaveFilter, onDeleteFilter}) {
    const [keys, setKeys] = useState(<></>);
    const [values, setValues] = useState(<></>);
    const [selectedValue, setSelectedValue] = useState();
    const [selectedKey, setSelectedKey] = useState();

    useEffect(() => {
        if (filterInfo) {
            getKeys();

            if (filterInfo?.key) {
                setSelectedKey(filterInfo.key);
            } else {
                setSelectedKey(filterInfo.filterable.keys[0]);
            }

            if (filterInfo?.value) {
                setSelectedValue(filterInfo.value);
            }
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

    useEffect(() => {
        if (selectedKey) {
            if (filterInfo?.filterable?.values) {
                const _values = [];
                filterInfo.filterable.values[selectedKey].forEach((value, index) => {
                    _values.push(
                        <option value={value} key={index}>
                            {JSON.stringify(value)}
                        </option>
                    );
                });
                setValues(_values);
                setSelectedValue(filterInfo.filterable.values[selectedKey][0]);
            }
        }
    }, [selectedKey]);


    useEffect(() => {
        if (selectedValue) {
            console.log("Selected Value:", selectedValue);
        }
    }, [selectedValue]);

    const saveFilter = (uid) => {
        onSaveFilter(uid, selectedKey, selectedValue);
    };

    return (
        <tr>
            <td style={{color: "grey"}}>{index + 1}</td>
            <td>
                <select value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                    className="filterSelector"
                    style={{width: "100%"}}
                    disabled={filterInfo.apply}>
                    {keys}
                </select></td>
            <td>
                <select className="filterSelector"
                    disabled={filterInfo.apply}
                    style={{width: "100%"}}>
                    <option>Equals</option>
                </select>
            </td>
            <td>
                <select value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="filterSelector"
                    disabled={filterInfo.apply}
                    style={{width: "100%"}}>
                    {values}
                </select>
            </td>
            <td style={{width: "50px"}}>
                <div className="d-flex justify-content-center">
                    {!filterInfo.apply &&
                        <CheckLg size={22}
                            onClick={() => saveFilter(filterInfo.uuid)}
                            style={{color: "#99ff70", cursor: "pointer"}}/>
                    }
                </div>
            </td>
            <td style={{width: "50px"}}>
                <div className="d-flex justify-content-center">
                    <Trash size={22}
                        onClick={() => onDeleteFilter(filterInfo.uuid)}
                        style={{color: "#ff7070", cursor: "pointer"}}/>
                </div>
            </td>
        </tr>
    );
};

