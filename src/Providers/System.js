
/**
 * This class contains all the properties of a system.
 */
class System {
    /**
     * @param {Object} systemInfo Information about the loaded system.
     * @param {Function} sendJsonMessage Function to send websocket message.
     */
    constructor (systemInfo) {
        this.id = systemInfo.system_id;
        this.version = systemInfo.version;
    }
}

export default System;
