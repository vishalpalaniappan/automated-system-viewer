import React, {useState} from "react";

import PropTypes from "prop-types";

CDLProviders.propTypes = {
    children: PropTypes.object,
};

/**
 * Provides all contexts consumed by the application.
 * @param {JSX} children
 * @param {string} fileInfo
 * @return {JSX}
 */
function CDLProviders ({children}) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {children}
        </>
    );
};

export default CDLProviders;
