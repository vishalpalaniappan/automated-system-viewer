
/**
 * This class contains all the properties of a system.
 */
class System {
    /**
     * @param {Object} systemInfo Information about the loaded system.
     * @param {Function} sendJsonMessage Function to send websocket message.
     */
    constructor (systemInfo, sendJsonMessage) {
        this.id = systemInfo.system_id + "_" + systemInfo.version;
        this.sysId = String(systemInfo.system_id);
        this.version = String(systemInfo.version);
        this.programs = systemInfo.programs;
        this.deployments = systemInfo.deployments;

        console.log("Created:", this.sysId, this.version);
    }
}

export default System;
