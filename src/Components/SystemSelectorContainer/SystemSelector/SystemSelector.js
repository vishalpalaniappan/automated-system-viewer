import React, {useContext, useEffect, useState} from "react";

import ActiveSystemContext from "../../../Providers/contexts/ActiveSystemContext";
import SystemsContext from "../../../Providers/contexts/SystemsContext";
import ActiveTracesContext from "../../../Providers/contexts/ActiveTracesContext";

import "./SystemSelector.scss";

/**
 * Contains the system selector components.
 * @return {JSX.Element}
 */
export function SystemSelector () {
    const {systemsList} = useContext(SystemsContext);
    const {activeSystem, setActiveSystem} = useContext(ActiveSystemContext);
    const {activeTraces, setActiveTraces} = useContext(ActiveTracesContext);

    const [systems, setSystems] = useState([]);
    const [versions, setVersions] = useState([]);
    const [deployments, setDeployments] = useState([]);
    const [activeSystemId, setActiveSystemId] = useState();
    const [activeVersion, setActiveVersion] = useState();
    const [activeDeployment, setActiveDeployment] = useState();
    const [numOfTraces, setNumOfTraces] = useState();

    // Load system select dropdown from systemsList and set active system.
    const loadSystems = () => {
        if (!systemsList || !Array.isArray(systemsList) || systemsList.length === 0) {
            setSystems([]);
            setVersions([]);
            setDeployments([]);
            return;
        }
        const sysIds = [...new Set(systemsList.map((item) => item.sysId))];
        const _systems = [];
        sysIds.forEach((id, index) => {
            _systems.push(<option key={id} value={id}>{id}</option>);
        });
        setSystems(_systems);
        if (sysIds.length > 0) {
            loadVersions(sysIds[0]);
        }
    };

    // Given a sys ID, load versions into select dropdown and set active version
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
        const sys = systemsList.filter(
            (obj) => {return (obj.sysId === systemid && obj.version == version);}
        )[0];
        const _deployments = [];
        const sysDeployments = sys.deployments;
        if (sys && sysDeployments && Array.isArray(sysDeployments) && sysDeployments.length > 0) {
            sysDeployments.forEach((deployment, index) => {
                const id = deployment.deployment_id;
                _deployments.push(<option key={id} value={id}>{id}</option>);
            });
            setDeployments(_deployments);
            setActiveDeployment(sysDeployments[0].deployment_id);
            setActiveSystem({
                id: systemid,
                version: version,
                deployment: sysDeployments[0].deployment_id,
            });
        } else {
            setDeployments([]);
            setActiveDeployment(null);
        }
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
        setActiveSystem({
            id: activeSystemId,
            version: activeVersion,
            deployment: e.target.value,
        });
    };

    // React to changes in systems, system and version
    useEffect(() => {
        if (systemsList) {
            loadSystems();
        }
    }, [systemsList]);


    useEffect(() => {
        if (activeTraces) {
            setNumOfTraces(activeTraces.length);
        }
    }, [activeTraces]);

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
            <div className="d-flex flex-row systemSelectRow">
                {numOfTraces &&
                    <span style={{width: "100%", textAlign: "end"}} >
                        {numOfTraces} Traces Found
                    </span>
                }
            </div>
        </div>
    );
}
