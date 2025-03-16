import React from "react";

import ASPProviders from "./Providers/ASPProviders";
import {Viewer} from "./Viewer/Viewer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

/**
 * Renders the application.
 *
 * @return {JSX.Element}
 */
export function App () {
    return (
        <ASPProviders>
            <Viewer/>
        </ASPProviders>
    );
}
