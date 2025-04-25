import React, {useContext, useEffect, useState} from "react";

import SystemsContext from "../../../Providers/SystemsContext";

import "./SystemSelector.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function SystemSelector () {
    const {systemsList} = useContext(SystemsContext);

    const [systems, setSystems] = useState();

    useEffect(() => {
        console.log(systemsList);
    }, [systemsList]);


    return (
        <div className="d-flex flex-column systemContainer">
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "110px"}}>System ID:</div>
                <div className="flex-grow-1">
                    <select></select>
                </div>
            </div>
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "110px"}}>Version:</div>
                <div className="flex-grow-1">asf</div>
            </div>
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "110px"}}>Deployments:</div>
                <div className="flex-grow-1">asf</div>
            </div>
        </div>
    );
}
