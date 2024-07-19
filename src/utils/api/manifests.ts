/* eslint-disable @typescript-eslint/no-explicit-any */
import API_ENDPOINTS from "src/config/api";

export interface CreateManifestBody {
  config: any;
}

export interface ManifestField {
  field_name: string;
  required: boolean;
  allowed_values?: string[] | null;
  description?: string;
  default_value?: string;
  compat_field_name?: string | null;
}

export interface MetadataConfig {
  version: string;
  fields: ManifestField[];
}

export interface Config {
  metadata_config: MetadataConfig;
  copy_config: any;
}

export interface Manifest {
  id: number;
  dataStreamRouteID: number;
  config: Config;
}

export const getManifests = async (
  access_token: string,
  datastream: string,
  route: string
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream}/routes/${route}/manifests`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).catch();

  return response;
};

export const createManifest = async (
  access_token: string,
  datastream: string,
  route: string,
  config: any
): Promise<Response> => {
  const url = `${API_ENDPOINTS.dataStreams}/${datastream}/routes/${route}/manifests`;

  const body = JSON.stringify({
    config,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body,
  }).catch();

  return response;
};
