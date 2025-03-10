import CDL_WORKER_PROTOCOL from "./CDL_WORKER_PROTOCOL";

self.onmessage = function (e) {
    try {
        const args = (e?.data?.args)?e.data.args:{};
        switch (e.data.code) {
            case CDL_WORKER_PROTOCOL.LOAD_FILE:
                console.log("Received file: " + args.fileInfo);
                break;
            default:
                break;
        }
    } catch (e) {
        console.error(e);
    }
};

self.onerror = (e) => {
    console.debug(e);
};
