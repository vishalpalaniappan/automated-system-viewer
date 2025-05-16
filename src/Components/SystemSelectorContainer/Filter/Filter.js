import React, {useContext, useEffect, useRef, useState} from "react";

import {Funnel} from "react-bootstrap-icons";

import ActiveFilteredTracesContext from "../../../Providers/contexts/ActiveFilteredTracesContext";
import {EditFilter} from "../EditFilter/EditFilter";

import "./Filter.scss";
/**
 * Contains the component used to filter through system level traces.
 * @return {JSX.Element}
 */
export function Filter () {
    const [editFilterShow, setEditFilterShow] = useState(false);
    const {activeTracesFiltered, setActiveTracesFiltered} = useContext(ActiveFilteredTracesContext);

    const getFilteredTraceLength = () => {
        if (activeTracesFiltered && activeTracesFiltered.length > 0) {
            const len = activeTracesFiltered.length;
            return <span>{len} Filtered Traces</span>;
        }
    };

    const getFiltersApplied = () => {
        if (activeTracesFiltered && activeTracesFiltered.length >= 0) {
            const len = activeTracesFiltered.length;
            return <span>{len} Filtered Applied</span>;
        }
    };

    return (
        <div className="w-100 h-100">
            <EditFilter show={editFilterShow}handleClose={() => setEditFilterShow(false)}/>
            <div className="showFilter pb-4" onClick={() => setEditFilterShow(true)}>
                <Funnel /> {getFiltersApplied()}
            </div>

            <span className="filteredTracesLength">{getFilteredTraceLength()}</span>
        </div>
    );
}
