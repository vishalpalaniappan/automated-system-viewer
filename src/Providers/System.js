
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
        this.sysId = systemInfo.system_id;
        this.version = systemInfo.version;

        sendJsonMessage({
            "queryType": "GET_SYSTEM",
            "data": {
                "systemId": this.sysId,
                "systemVersion": this.version,
            },
        });
    }

    /**
     * Loads the results of deployments and program queries.
     * @param {Object} info 
     */
    loadInfo (info) {
        Object.keys(info).forEach((key, index) => {
            this[key] = info[key];
        });
    }
}

export default System;
