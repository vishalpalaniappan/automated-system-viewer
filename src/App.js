import React, {useEffect, useState} from "react";

import CDLProviders from "./Providers/CDLProviders";
import {Viewer} from "./Viewer/Viewer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

/**
 * Renders the application.
 *
 * @return {JSX.Element}
 */
export function App () {
    const [fileInfo, setFileInfo] = useState(null);

    return (
        <CDLProviders fileInfo={fileInfo}>
            <Viewer/>
        </CDLProviders>
    );
}
