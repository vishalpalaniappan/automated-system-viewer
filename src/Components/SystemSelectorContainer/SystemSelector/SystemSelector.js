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
        <div>
        </div>
    );
}
