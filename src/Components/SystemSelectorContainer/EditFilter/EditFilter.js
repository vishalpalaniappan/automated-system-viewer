import React, {useContext, useEffect, useRef, useState} from "react";

import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";

import ActiveTracesContext from "../../../Providers/ActiveTracesContext";
import {processTraces} from "./helper";
import {ValueBox} from "./ValueBox/ValueBox";

import "react-datepicker/dist/react-datepicker.css";
import "./EditFilter.scss";

/**
 *
 * @param {*} param0
 * @returns
 */
export function EditFilter ({show, handleClose, title, body}) {
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);
    const [selectedKey, setSelectedKey] = useState();
    const [keysDiv, setKeysDiv] = useState();

    useEffect(() => {
        if (activeTraces) {
            const filters = processTraces(activeTraces);
            const _keys = [];
            filters.keys.forEach((key, index) => {
                _keys.push(<option key={key} value={key}>{key}</option>);
            });
            setKeysDiv(_keys);
            setSelectedKey(filters.keys[0]);
        }
    }, [activeTraces]);

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered data-bs-theme="dark">
            <Modal.Body>

                <div className="d-flex flex-row">
                    <label style={{width: "100px"}}>Select Key:</label>
                    <select onChange={(e) => {setSelectedKey(e.target.value);}}
                        value={selectedKey} className="d-flex customSelector">
                        {keysDiv}
                    </select>
                </div>

                <div className="d-flex flex-row" style={{"height": "400px"}}>
                    <div className="h-100 d-flex flex-grow-1">
                        <div className="w-100 h-100 p-3">
                            <div className="selectContainer">
                                <ValueBox activeKey={selectedKey} />
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

