import React, {useContext, useEffect, useState} from "react";

import SystemsContext from "../../../Providers/SystemsContext";

import "./SystemSelector.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function SystemSelector () {
    const {systemsList} = useContext(SystemsContext);

    const [systems, setSystems] = useState([]);
    const [versions, setVersions] = useState([]);
    const [deployments, setDeployments] = useState([]);
    const [activeSystemId, setActiveSystemId] = useState();
    const [activeVersion, setActiveVersion] = useState();
    const [activeDeployment, setActiveDeployment] = useState();

    // Load system select dropdown from systemsList and set active system.
    const loadSystems = () => {
        const sysIds = [...new Set(systemsList.map((item) => item.sysId))];
        const _systems = [];
        sysIds.forEach((id, index) => {
            _systems.push(<option key={id} value={id}>{id}</option>);
        });
        setSystems(_systems);
        loadVersions(sysIds[0]);
    };

    // Given a system ID, load versions into select dropdown, set active version
    const loadVersions = (systemid) => {
        setActiveSystemId(systemid);
        const filteredSystems = systemsList.filter((obj) => {return obj.sysId === systemid;});
        const versionsList = [...new Set(filteredSystems.map((item) => item.version))];
        const _versions = [];
        versionsList.forEach((version, index) => {
            _versions.push(<option key={version} value={version}>{version}</option>);
        });
        setVersions(_versions);
        loadDeployments(systemid, versionsList[0]);
    };

    // Given a system id and version load deployments and set active deployment.
    const loadDeployments = (systemid, version) => {
        setActiveVersion(version);
        const system = systemsList.filter(
            (obj) => {return (obj.sysId === systemid && obj.version == version);}
        )[0];
        const _deployments = [];
        system.deployments.forEach((deployment, index) => {
            const id = deployment.deployment_id;
            _deployments.push(<option key={id} value={id}>{id}</option>);
        });
        setDeployments(_deployments);
        setActiveDeployment(system.deployments[0].deployment_id);
    };

    // Callback functions when selector is manually changed
    const selectVersion = (e) => {
        loadDeployments(activeSystemId, e.target.value);
    };

    const selectSystemId = (e) => {
        loadVersions(e.target.value);
    };

    const selectDeployment = (e) => {
        setActiveDeployment(e.target.value);
    };

    // React to changes in systems, system and version
    useEffect(() => {
        if (systemsList) {
            loadSystems();
        }
    }, [systemsList]);

    return (
        <div className="d-flex flex-column systemContainer">
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "100px"}}>System ID:</div>
                <div className="flex-grow-1">
                    <select
                        onChange={selectSystemId}
                        className="customSelector">
                        {systems}
                    </select>
                </div>
            </div>
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "100px"}}>Version:</div>
                <div className="flex-grow-1">
                    <select
                        onChange={selectVersion}
                        className="customSelector">
                        {versions}
                    </select>
                </div>
            </div>
            <div className="d-flex flex-row systemSelectRow">
                <div style={{width: "100px"}}>Deployments:</div>
                <div className="flex-grow-1">
                    <select
                        onChange={selectDeployment}
                        className="customSelector">
                        {deployments}
                    </select>
                </div>
            </div>
        </div>
    );
}
