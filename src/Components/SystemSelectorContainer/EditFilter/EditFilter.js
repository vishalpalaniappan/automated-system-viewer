import React, {useContext, useEffect, useRef, useState} from "react";

import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";

import { processTraces } from "./helper";

import ActiveTracesContext from "../../../Providers/ActiveTracesContext";

import "react-datepicker/dist/react-datepicker.css";

import "./EditFilter.scss"

/**
 *
 * @param {*} param0
 * @returns
 */
export function EditFilter ({show, handleClose, title, body}) {
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);
    const [filterableValues, setFilterableValues] = useState();
    const [selectedKey, setSelectedKey] = useState();
    const [selectedKeyValues, setSelectedKeyValues] = useState();

    useEffect(() => {
        if (activeTraces) {
            const filters = processTraces(activeTraces);
            setFilterableValues(filters);
            console.log(filters);
        }
    }, [activeTraces]);

    const getKeys = () => {
        if (filterableValues?.keys) {
            const _keys = [];
            filterableValues.keys.forEach((key, index) => {
                _keys.push(<option key={key} value={key}>{key}</option>);
            });
            return _keys;
        }
    };

    const getValues = () => {
        if (filterableValues?.values) {
            console.log(filterableValues.values[selectedKey]);
        }
    };

    useEffect(() => {
        if (selectedKey && filterableValues?.values) {
            console.log("Selected Key:", selectedKey);
            setSelectedKeyValues(filterableValues.values[selectedKey]);
        }
    }, [selectedKey]);


    return (
        <Modal show={show} onHide={handleClose} size="lg" centered data-bs-theme="dark">
            <Modal.Body>

                <div className="d-flex flex-row">
                    <label style={{width: "100px"}}>Select Key:</label>
                    <select onChange={(e) => {setSelectedKey(e.target.value);}}
                        value={selectedKey} className="d-flex customSelector">
                        {getKeys()}
                    </select>
                </div>

                <div className="d-flex flex-row" style={{"height": "400px"}}>
                    <div className="h-100 d-flex flex-grow-1">
                        <div className="w-100 h-100 p-3">
                            <div className="selectContainer">
                                {getValues()}
                            </div>
                        </div>
                    </div>

                    <div className="h-100" style={{"width": "50px"}}>

                    </div>

                    <div className="h-100 d-flex flex-grow-1">
                        <div className="w-100 h-100 p-3">
                            <div className="selectContainer">

                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

