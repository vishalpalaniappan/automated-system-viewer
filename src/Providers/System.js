
/**
 * This class contains all the properties of a system.
 */
class System {
    /**
     * @param {Object} systemInfo Information about the loaded system.
     */
    constructor (systemInfo) {
        this.id = systemInfo.system_id + "_" + systemInfo.system_ver;
        this.sysId = String(systemInfo.system_id);
        this.version = String(systemInfo.system_ver);
        this.programs = systemInfo.programs;
        this.deployments = systemInfo.deployments;
        console.log("");
        console.log("Created System");
        console.log("System ID:", this.sysId);
        console.log("System Version:", this.version);
    }
}

export default System;
