import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import useWebSocket, {ReadyState} from "react-use-websocket";

CDLProviders.propTypes = {
    children: PropTypes.object,
};

const WS_URL = "ws://localhost:8765";

/**
 * Provides all contexts consumed by the application.
 * @param {JSX} children
 * @param {string} fileInfo
 * @return {JSX}
 */
function CDLProviders ({children}) {
    // State that holds the history of recived messages
    const [messageHistory, setMessageHistory] = useState([]);

    // Open websocket connection and reconnect when it closes
    const {sendJsonMessage, lastMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    // React to changes in the websocket ready state
    useEffect(() => {
        console.debug(`Connection state: ${connectionStatus}`);
        switch (readyState) {
            case ReadyState.OPEN:
                sendJsonMessage({event: "connected"});
                break;
            case ReadyState.CONNECTING:
                break;
            case ReadyState.CLOSING:
                break;
            case ReadyState.CLOSED:
                break;
            case ReadyState.UNINSTANTIATED:
                break;
        }
    }, [readyState]);

    // Map connection status to string for debugging
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    // React to received messages
    useEffect(() => {
        if (lastMessage) {
            console.debug(`Received Message: ${lastMessage.data}`);
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    return (
        <>
            {children}
        </>
    );
};

export default CDLProviders;
