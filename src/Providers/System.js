
/**
 * This class contains all the properties of a system.
 */
class System {
    /**
     * @param {Object} systemInfo Information about the loaded system.
     */
    constructor (systemInfo) {
        this.id = systemInfo.system_id + "_" + systemInfo.version;
        this.sysId = String(systemInfo.system_id);
        this.version = String(systemInfo.version);
        this.programs = systemInfo.programs;
        this.deployments = systemInfo.deployments;

        console.log("Created System:", this.sysId, this.version);
    }
}

export default System;
