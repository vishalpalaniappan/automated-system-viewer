self.onmessage = function (e) {
    try {
        switch (e.data.code) {
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
