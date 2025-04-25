/**
 * Get the delta betwen two timestamps in seconds.
 * @param {Number} start Starting timestamp
 * @param {Number} end Ending timestamp
 * @return {object}
 */
export function getDurationinSeconds (start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationSec = (endDate.getTime() - startDate.getTime()) / 1000;
    return durationSec;
}

/**
 * Formats a given timestamp to a human readable form.
 * @param {Number} timestamp
 * @return {String} Formatted string representing the date.
 */
export function formatTimestampToDateTime (timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
