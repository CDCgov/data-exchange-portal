import { useState, useEffect, Fragment } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@us-gov-cdc/cdc-react";

import { getIdentities } from "src/utils/api/identities";
import { getEntities } from "src/utils/api/entities";
import { getAuthGroups } from "src/utils/api/authGroups";

function UserAuthGroup() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [identitiesList, setIdentitiesList] = useState([]);

  const [entitiesList, setEntitiesList] = useState([]);

  const [authGroupsList, setAuthGroupsList] = useState([]);

  const [selectedIdentityName, setSelectedIdentityName] = useState("");
  const [selectedIdentityId, setSelectedIdentityId] = useState("");

  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  const [selectedAuthGroupName, setSelectedAuthGroupName] = useState("");
  const [selectedAuthGroupId, setSelectedAuthGroupId] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  useEffect(() => {
    fetchIdentities();
    fetchEntities();
  }, []);

  const fetchIdentities = async () => {
    const res = await getIdentities(authToken);
    const json = await res.json();
    setIdentitiesList(json);
  };

  const fetchEntities = async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  };

  const fetchAuthGroups = async (entity_id: string) => {
    const res = await getAuthGroups(authToken, entity_id);
    const json = await res.json();
    setAuthGroupsList(json);
  };

  const handleSetIdentities = async (e: any) => {
    setSelectedIdentityId(e.target.value);
    setSelectedIdentityName(e.target.selectedOptions[0].text);
  };

  const handleSetEntity = async (e: any) => {
    setSelectedEntityId(e.target.value);
    setSelectedEntityName(e.target.selectedOptions[0].text);
    await fetchAuthGroups(e.target.value);
  };

  const handleSetAuthGroup = (e: any) => {
    setSelectedAuthGroupId(e.target.value);
    setSelectedAuthGroupName(e.target.selectedOptions[0].text);
  };

  const setIdentitiesDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Identity</option>
        {identitiesList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const setEntityDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select Entity</option>
        {entitiesList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const setAuthGroupDropdownOptions = () => {
    return (
      <Fragment>
        <option value="">Select AuthGroup</option>
        {authGroupsList.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Fragment>
    );
  };

  const handleLinkUserToAuthGroup = () => {
    console.log("selectedIdentityId:", selectedIdentityId);
    console.log("selectedIdentityName:", selectedIdentityName);
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedEntityName:", selectedEntityName);
    console.log("selectedAuthGroupId:", selectedAuthGroupId);
    console.log("selectedAuthGroupName:", selectedAuthGroupName);
  };

  return (
    <>
      <h2 className="font-sans-lg">User ↔ AuthGroup Assignment</h2>
      <div className="grid-row">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="identity-dropdown">
            Select Identity
          </label>
          <select
            className="usa-select"
            name="identity-dropdown"
            id="identity-dropdown"
            onChange={handleSetIdentities}>
            {setIdentitiesDropdownOptions()}
          </select>
        </div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <div className="grid-row">
        <div className="grid-col flex-1 padding-right-2">
          <label className="usa-label" htmlFor="entity-dropdown">
            Select Entity
          </label>
          <select
            className="usa-select"
            name="entity-dropdown"
            id="entity-dropdown"
            onChange={handleSetEntity}>
            {setEntityDropdownOptions()}
          </select>
        </div>

        <div className="grid-col flex-1">
          <label className="usa-label" htmlFor="authgroup-dropdown">
            Select AuthGroup
          </label>
          <select
            className="usa-select"
            name="authgroup-dropdown"
            id="authgroup-dropdown"
            onChange={handleSetAuthGroup}>
            {setAuthGroupDropdownOptions()}
          </select>
        </div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <Button
        className="margin-top-4"
        ariaLabel="Link AuthGroup to DataStream"
        onClick={handleLinkUserToAuthGroup}>
        Submit
      </Button>
    </>
  );
}

export default UserAuthGroup;
