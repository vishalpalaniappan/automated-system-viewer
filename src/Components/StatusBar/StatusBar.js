import React, {useContext, useEffect, useState} from "react";

import {ReadyState} from "react-use-websocket";

import WebsocketConnectionStateContext from "../../Providers/contexts/WebsocketConnectionStateContext";

import "./StatusBar.scss";
/**
 * Contains the status bar.
 * @return {JSX.Element}
 */
export function StatusBar () {
    const {readyState} = useContext(WebsocketConnectionStateContext);
    const [websocketState, setWebsocketState] = useState("Uninstantiated");

    // Map connection status to string for debugging
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Attempting Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Connection Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    useEffect(() => {
        setWebsocketState(connectionStatus);
    }, [readyState]);

    const statusBarStyle = {
        width: "100%",
        height: "100%",
        color: "white",
        paddingRight: "5px",
    };

    const statusMessageStyle = {
        textAlign: "center",
        float: "right",
        marginTop: "3px",
        fontSize: "12px",
    };


    return (
        <div style={statusBarStyle}>
            <div style={statusMessageStyle}>
                Websocket Connection: {websocketState}
            </div>
        </div>
    );
}
