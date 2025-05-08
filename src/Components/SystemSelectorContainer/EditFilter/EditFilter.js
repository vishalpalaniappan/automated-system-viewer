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

    useEffect(() => {
        if (activeTraces) {
            const filters = processTraces(activeTraces);
            setFilterableValues(filters);
            console.log(filters);
        }
    }, [activeTraces]);


    return (
        <Modal show={show} onHide={handleClose} centered data-bs-theme="dark">
            <Modal.Header>
                Edit Filter
            </Modal.Header>
            <Modal.Body>


            </Modal.Body>
        </Modal>
    );
};

