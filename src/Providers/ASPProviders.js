import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import useWebSocket, {ReadyState} from "react-use-websocket";

import FileTreeContext from "./FileTreeContext";
import System from "./System";
import SystemsContext from "./SystemsContext";

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
    const [systemsList, setSystemsList] = useState(null);

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


    const loadSystems = (systems) => {
        const _systems = [];
        systems.forEach((system, index) => {
            _systems.push(new System(system));
        });
        setSystemsList(_systems);
    };

    const handleMessage = (msg) => {
        if (msg.queryType == "GET_SYSTEMS") {
            loadSystems(msg.response);
        }
    };

    return (
        <>
            <FileTreeContext.Provider value={{fileTree}}>
                <SystemsContext.Provider value={{systemsList}}>
                    {children}
                </SystemsContext.Provider>
            </FileTreeContext.Provider>
        </>
    );
};

export default ASPProviders;
