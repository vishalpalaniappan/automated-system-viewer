
/**
 * This function processes the system level traces to extract the
 * filterable properties.
 *
 * @param {Array} traces Array of system level traces.
 * @return {Object}
 */
export function processTraces (traces) {
    const keys = [];
    const values = {};
    let startTs;
    let endTs;

    traces.forEach((trace, index) => {
        const nodes = JSON.parse(trace.traces);
        const startNode = nodes[0];
        const value = startNode.adliValue;

        startTs = nodes[0].timestamp;
        endTs = nodes[nodes.length - 1].timestamp;

        Object.keys(value).forEach((key, index) => {
            // If key has not been saved, add it.
            if (keys.indexOf(key) == -1) {
                keys.push(key);
            }

            // If the key does not exist in the values object, initialize
            // it as an empty array.
            if (!(key in values)) {
                values[key] = [];
            }

            // If the value has not been saved, save it to the values object.
            if (values[key].indexOf(value[key]) == -1) {
                values[key].push(value[key]);
            }
        });
    });

    return {
        keys: keys,
        values: values,
        startTs: startTs,
        endTs: endTs,
    };
};

/**
 * 
 * @param {Array} traces
 * @param {Object} filters
 */
export function applyFilter(traces, filters) {
    console.log("Filters:", filters);
    console.log("Traces:", traces);

    if (filters) {
        filters.forEach((filter, index) => {
            if (filter.apply) {
                console.log(filter);
            }
        });
    }
};
