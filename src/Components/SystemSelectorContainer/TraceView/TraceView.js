import React, {useContext, useEffect, useState} from "react";

import SystemsContext from "../../../Providers/SystemsContext";

import "./TraceView.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function TraceView () {
    const {systemsList} = useContext(SystemsContext);

    const [systems, setSystems] = useState();

    useEffect(() => {
        console.log(systemsList);
    }, [systemsList]);


    return (
        <div>
        </div>
    );
}
