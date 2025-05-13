import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import useWebSocket, {ReadyState} from "react-use-websocket";

import ActiveFilteredTracesContext from "./contexts/ActiveFilteredTracesContext";
import ActiveNodeContext from "./contexts/ActiveNodeContext";
import ActiveSystemContext from "./contexts/ActiveSystemContext";
import ActiveTraceContext from "./contexts/ActiveTraceContext";
import ActiveTracesContext from "./contexts/ActiveTracesContext";
import SystemsContext from "./contexts/SystemsContext";
import WebsocketConnectionStateContext from "./contexts/WebsocketConnectionStateContext";
import System from "./System";

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

    const [systemsList, setSystemsList] = useState(null);
    const [activeSystem, setActiveSystem] = useState();
    const [activeVersion, setActiveVersion] = useState();
    const [activeDeployment, setActiveDeployment] = useState();
    const [activeTraces, setActiveTraces] = useState();
    const [activeTracesFiltered, setActiveTracesFiltered] = useState();
    const [activeTrace, setActiveTrace] = useState();
    const [activeNode, setActiveNode] = useState();

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

    // Load the systems
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
        } else if (msg.queryType == "GET_TRACES") {
            setActiveTraces(msg.response);
        }
    };

    // Get the traces for the active system and deployment.
    useEffect(() => {
        if (activeSystem) {
            sendJsonMessage({
                queryType: "GET_TRACES",
                data: {
                    "systemId": activeSystem.id,
                    "systemVersion": activeSystem.version,
                    "deploymentId": activeSystem.deployment,
                },
            });
        }
    }, [activeSystem]);

    return (
        <WebsocketConnectionStateContext.Provider value={{readyState}}>
            <ActiveNodeContext.Provider value={{activeNode, setActiveNode}}>
                <ActiveTraceContext.Provider value={{activeTrace, setActiveTrace}}>
                    <SystemsContext.Provider value={{systemsList}}>
                        <ActiveSystemContext.Provider value={{activeSystem, setActiveSystem}}>
                            <ActiveTracesContext.Provider value={{activeTraces, setActiveTraces}}>
                                <ActiveFilteredTracesContext.Provider
                                    value={{activeTracesFiltered, setActiveTracesFiltered}}>
                                    {children}
                                </ActiveFilteredTracesContext.Provider>
                            </ActiveTracesContext.Provider>
                        </ActiveSystemContext.Provider>
                    </SystemsContext.Provider>
                </ActiveTraceContext.Provider>
            </ActiveNodeContext.Provider>
        </WebsocketConnectionStateContext.Provider>
    );
};

export default ASPProviders;
