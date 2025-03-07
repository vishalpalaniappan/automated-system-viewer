import React from "react";

import {Tab} from "./Tab/Tab";

import "./Tabs.scss";

/**
 * Renders the tabs.
 * @return {JSX.Element}
 */
export function Tabs () {
    return (
        <div className="tabs d-flex">
            <Tab tabName={"sample.py"}></Tab>
        </div>
    );
}
