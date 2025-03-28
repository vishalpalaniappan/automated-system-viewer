
/**
 *
 */
class TraceParser {
    /**
     * Identify the log line type and process the line.
     * @param {Array} uniqueTraces The unique traces extracted by the
     * system processor.
     */
    constructor (uniqueTraces) {
        this.uniqueTraces = uniqueTraces;
        this.logFiles = [];
        this.graphNodes = [];

        this.processTraces();

        this.graphInfo = {
            "nodes": this.graphNodes,
            "edges": null,
        };
    }

    /**
     * Process the traces.
     */
    processTraces () {
        for (const uid in this.uniqueTraces) {
            if (uid) {
                this.uniqueTraces[uid].forEach((trace, index) => {
                    const nodeName = trace.logFileName;
                    this.addNode(nodeName);
                });
            }
        }
    }

    /**
     * Adds a node to the logfile list and graph node
     * if it doesn't already exist.
     * @param {String} nodeName
     */
    addNode (nodeName) {
        if (this.logFiles.indexOf(nodeName) == -1) {
            this.logFiles.push(nodeName);
            this.graphNodes.push({
                id: nodeName,
                data: {label: nodeName},
                position: {x: (this.logFiles.length) * 200, y: 5},
            });
        }
    }
};

export default TraceParser;
