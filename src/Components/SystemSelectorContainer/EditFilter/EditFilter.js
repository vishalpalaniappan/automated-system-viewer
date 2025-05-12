import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Check, Plus, PlusCircleDotted, Trash} from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

import ActiveSystemContext from "../../../Providers/contexts/ActiveSystemContext";
import ActiveTracesContext from "../../../Providers/contexts/ActiveTracesContext";
import {FilterRow} from "./FilterRow/FilterRow";
import {processTraces} from "./helper";

import "react-datepicker/dist/react-datepicker.css";
import "./EditFilter.scss";


EditFilter.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
};


/**
 * Renders a component to edit the selected filter.
 * @return {JSX}
 */
export function EditFilter ({show, handleClose}) {
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);
    const {activeSystem, setActiveSystem} = useContext(ActiveSystemContext);
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

            <Modal.Header className="d-flex justify-content-between">
                <div>
                    <span>System ID:</span>
                    <span className="header-value">{activeSystem?.id}</span>
                </div>
                <div>
                    <span >Version:</span>
                    <span className="header-value">{activeSystem?.version}</span>
                </div>
                <div>
                    <span>Deployment:</span>
                    <span className="header-value">{activeSystem?.deployment}</span>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex flex-column h-100">
                    <div className="d-flex justify-content-center pb-2">
                        <span style={{cursor: "pointer"}}> Add Filter <PlusCircleDotted /> </span>
                    </div>
                    <div className="d-flex flex-grow-1">

                        <div className="modal-body-content">
                            <div style={{height: "600px", width: "100%"}}>
                                <Table className="transparent-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Key</th>
                                            <th>Filter Type</th>
                                            <th>Filter</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <FilterRow />
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-end">
                        <span> 20 Filtered Traces </span>
                    </div>

                </div>
            </Modal.Body>

        </Modal>
    );
};

