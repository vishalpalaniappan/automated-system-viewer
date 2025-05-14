import React, {useContext, useEffect, useRef, useState} from "react";

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

    const getFilterInfo = () => {
        if (activeTracesFiltered) {
            return <span>{activeTracesFiltered.length} Filtered Traces.</span>;
        }
    };

    return (
        <div className="w-100 h-100">
            <div className="showFilter pb-4" onClick={() => setEditFilterShow(true)}>
                Edit Filter
            </div>

            <EditFilter
                show={editFilterShow}
                handleClose={() => setEditFilterShow(false)}
            />
            <div className="w-100 d-flex justify-content-center" style={{color:"white"}}>
                {getFilterInfo()}
            </div>

        </div>
    );
}
