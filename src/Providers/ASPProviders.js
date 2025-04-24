import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import useWebSocket, {ReadyState} from "react-use-websocket";

import FileTreeContext from "./FileTreeContext";
import UniqueTraceContext from "./UniqueTraceContext";

ASPProviders.propTypes = {
    children: PropTypes.object,
};

const WS_URL = "ws://localhost:8765";

/**
 * Provides all contexts consumed by the application.
 * @param {JSX} children
 * @param {string} fileInfo
 * @return {JSX}
 */
function ASPProviders ({children}) {
    // State that holds the history of received messages
    const [messageHistory, setMessageHistory] = useState([]);

    const [fileTree, setFileTree] = useState();
    const [uniqueTrace, setUniqueTrace] = useState();

    // Open websocket connection and reconnect when it closes
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    // Map connection status to string for debugging
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    // React to changes in the websocket state
    useEffect(() => {
        console.debug(`Connection state: ${connectionStatus}`);
        if (readyState === ReadyState.OPEN) {
            console.log("RUNNING");
            sendJsonMessage(
                {queryType: "GET_SYSTEMS"}
            );
        }
    }, [readyState]);

    // React to received messages
    useEffect(() => {
        if (lastJsonMessage) {
            handleMessage(lastJsonMessage);
            setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastJsonMessage]);


    const handleMessage = (msg) => {
        if (msg.queryType == "GET_SYSTEMS") {
            console.log("Systems:", msg.response);
        }
    };

    return (
        <>
            <FileTreeContext.Provider value={{fileTree}}>
                <UniqueTraceContext.Provider value={{uniqueTrace}}>
                    {children}
                </UniqueTraceContext.Provider>
            </FileTreeContext.Provider>
        </>
    );
};

export default ASPProviders;
