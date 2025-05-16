import {createContext} from "react";

// This context stores the active system information.
const ActiveSystemContext = createContext({
    systemId: null,
    version: null,
    deployment: null,
});

export default ActiveSystemContext;
