import { useCallback, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import Select, { SelectOption } from "src/components/formFields/Select";

import { Button } from "@us-gov-cdc/cdc-react";

import { getIdentities, Identity } from "src/utils/api/identities";
import { getEntities, Entity } from "src/utils/api/entities";
import {
  getAuthGroups,
  assignUserToAuthGroup,
  AuthGroup,
} from "src/utils/api/authGroups";

function UserAuthGroup() {
  const auth = useAuth();
  const [authToken, setAuthToken] = useState("");

  const [identitiesList, setIdentitiesList] = useState([]);
  const [entitiesList, setEntitiesList] = useState([]);
  const [authGroupsList, setAuthGroupsList] = useState([]);

  const [selectedIdentityId, setSelectedIdentityId] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [selectedAuthGroupId, setSelectedAuthGroupId] = useState("");

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? "");
  }, [auth]);

  const fetchIdentities = useCallback(async () => {
    const res = await getIdentities(authToken);
    const json = await res.json();
    setIdentitiesList(json);
  }, [authToken]);

  const fetchEntities = useCallback(async () => {
    const res = await getEntities(authToken);
    const json = await res.json();
    setEntitiesList(json);
  }, [authToken]);

  useEffect(() => {
    fetchIdentities();
    fetchEntities();
  }, [fetchEntities, fetchIdentities]);

  const fetchAuthGroups = async (entity_id: string) => {
    const res = await getAuthGroups(authToken, entity_id);
    const json = await res.json();
    setAuthGroupsList(json);
  };

  const handleSetIdentities = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedIdentityId(e.target.value);
  };

  const handleSetEntity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEntityId(e.target.value);
    await fetchAuthGroups(e.target.value);
  };

  const handleSetAuthGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthGroupId(e.target.value);
  };

  const identitiesOptions: SelectOption[] = identitiesList.map(
    (i: Identity) => ({
      value: i.id,
      display: i.idpClientID,
    })
  );

  const entitiesOptions: SelectOption[] = entitiesList.map((e: Entity) => ({
    value: e.id,
    display: e.name,
  }));

  const authGroupOptions: SelectOption[] = authGroupsList.map(
    (g: AuthGroup) => ({
      value: g.id,
      display: g.name,
    })
  );

  const handleLinkUserToAuthGroup = async () => {
    console.log("selectedIdentityId:", selectedIdentityId);
    console.log("selectedEntityId:", selectedEntityId);
    console.log("selectedAuthGroupId:", selectedAuthGroupId);
    const response = await assignUserToAuthGroup(
      authToken,
      +selectedIdentityId,
      +selectedAuthGroupId
    );
    setResponseMessage(response.statusText);
  };

  return (
    <>
      <h2 className="font-sans-lg">User ↔ AuthGroup Assignment</h2>
      <div className="grid-row margin-top-2">
        <Select
          className="grid-col flex-1 padding-right-2"
          id="identity-list-select"
          label="Select Identity"
          onChange={handleSetIdentities}
          options={identitiesOptions}
        />
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <div className="grid-row margin-top-2">
        <Select
          className="grid-col flex-1 padding-right-2"
          id="entity-list-select"
          label="Select Entity"
          onChange={handleSetEntity}
          options={entitiesOptions}
        />
        <Select
          className="grid-col flex-1 padding-right-2"
          id="authgroup-list-select"
          label="Select Authgroup"
          onChange={handleSetAuthGroup}
          options={authGroupOptions}
        />
        <div className="grid-col flex-1"></div>
        <div className="grid-col flex-1"></div>
      </div>
      <div className="display-flex flex-align-center margin-top-4">
        <Button
          className="margin-top-4"
          ariaLabel="Link AuthGroup to DataStream"
          onClick={handleLinkUserToAuthGroup}>
          Submit
        </Button>
        <div className="padding-left-2 font-mono-md">{responseMessage}</div>
      </div>
    </>
  );
}

export default UserAuthGroup;
