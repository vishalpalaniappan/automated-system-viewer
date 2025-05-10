import React, {useContext, useEffect, useRef, useState} from "react";

import {EditFilter} from "../EditFilter/EditFilter";

import "./Filter.scss";

/**
 * Contains the component used to filter through system level traces.
 * @return {JSX.Element}
 */
export function Filter () {
    const [editFilterShow, setEditFilterShow] = useState(false);

    return (
        <div className="w-100 h-100">
            <div className="showFilter" onClick={() => setEditFilterShow(true)}>Edit Filter</div>

            <EditFilter
                show={editFilterShow}
                handleClose={() => setEditFilterShow(false)}
                title="Edit Filter"
            />
        </div>
    );
}
