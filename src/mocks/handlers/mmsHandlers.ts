import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";

import { CreateDataStreamBody, DataStream } from "src/utils/api/dataStreams";
import { CreateEntityBody, Entity } from "src/utils/api/entities";
import { CreateManifestBody, Manifest } from "src/utils/api/manifests";
import { CreateProgramBody, Program } from "src/utils/api/programs";
import { CreateRouteBody, Route } from "src/utils/api/routes";
import {
  CreateAuthGroupBody,
  CreateIdentityGroupBody,
  CreateDatastreamRouteGroupBody,
} from "src/utils/api/authGroups";

import mockAuthgroups from "src/mocks/data/authGroups";
import {
  mockDataStreams,
  mockDataStreamsWithRoutes,
} from "src/mocks/data/dataStreams";
import mockEntities from "src/mocks/data/entities";
import mockIdentities from "src/mocks/data/identities";
import mockManifests from "src/mocks/data/manifests";
import { mockPrograms1, mockPrograms2 } from "src/mocks/data/programs";
import { mockRoutes1, mockRoutes2 } from "src/mocks/data/routes";

export const mmsHandlers = [
  // --> Datastreams
  http.get(API_ENDPOINTS.currentUserDatastreamRoutes, () => {
    return HttpResponse.json(mockDataStreamsWithRoutes);
  }),
  http.get(API_ENDPOINTS.dataStreams, () => {
    return HttpResponse.json(mockDataStreams);
  }),
  http.get(`${API_ENDPOINTS.dataStreams}/:datastream_id`, ({ params }) => {
    const { datastream_id } = params;

    if (!datastream_id || datastream_id == "NaN") {
      return new HttpResponse(null, { status: 400 });
    }

    const datastreamIdStr = Array.isArray(datastream_id)
      ? datastream_id[0]
      : datastream_id;
    const datastreamIdNumber = parseInt(datastreamIdStr, 10);

    const dataStream = mockDataStreams.find(
      (el: DataStream) => el.id == datastreamIdNumber
    );
    return HttpResponse.json(dataStream);
  }),
  http.post(API_ENDPOINTS.dataStreams, async ({ request }) => {
    const { name, programID } = (await request.json()) as CreateDataStreamBody;

    if (!name || !programID) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({ id: 1, programID, name });
  }),

  // --> Entities
  http.get(API_ENDPOINTS.entities, () => {
    return HttpResponse.json(mockEntities);
  }),
  http.get(`${API_ENDPOINTS.entities}/:entity_id`, ({ params }) => {
    const { entity_id } = params;

    if (!entity_id || entity_id == "NaN") {
      return new HttpResponse(null, { status: 400 });
    }

    const entityIdStr = Array.isArray(entity_id) ? entity_id[0] : entity_id;
    const entityIdNumber = parseInt(entityIdStr, 10);

    const entity = mockEntities.find((el: Entity) => el.id == entityIdNumber);
    return HttpResponse.json(entity);
  }),
  http.post(API_ENDPOINTS.entities, async ({ request }) => {
    const { name } = (await request.json()) as CreateEntityBody;

    if (!name) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({ id: 1, name });
  }),

  // --> Manifests
  http.get(
    `${API_ENDPOINTS.dataStreams}/:dataStream/routes/:route/manifests`,
    ({ params }) => {
      const { dataStream, route } = params;

      if (!dataStream || !route) {
        return new HttpResponse(null, { status: 400 });
      }

      const manifestDataStream = mockDataStreams.find(
        (d: DataStream) => d.name == dataStream
      );
      if (!manifestDataStream) return HttpResponse.json([]);

      const routes = manifestDataStream.id == 1 ? mockRoutes1 : mockRoutes2;
      const manifestRoute = routes.find((r: Route) => r.name == route);
      if (!manifestRoute) return HttpResponse.json([]);

      const manifests = mockManifests.filter(
        (el: Manifest) => el.dataStreamRouteID == manifestRoute.id
      );
      return HttpResponse.json(manifests);
    }
  ),
  http.post(
    `${API_ENDPOINTS.dataStreams}/:dataStream/routes/:route/manifests`,
    async ({ request, params }) => {
      const { dataStream, route } = params;
      const { config } = (await request.json()) as CreateManifestBody;

      if (!dataStream || !route || !config) {
        return new HttpResponse(null, { status: 400 });
      }

      const manifestDataStream = mockDataStreams.find(
        (d: DataStream) => d.name == dataStream
      );
      if (!manifestDataStream) return new HttpResponse(null, { status: 400 });

      const routes = manifestDataStream.id == 1 ? mockRoutes1 : mockRoutes2;
      const manifestRoute = routes.find((r: Route) => r.name == route);
      if (!manifestRoute) return new HttpResponse(null, { status: 400 });

      return HttpResponse.json({
        id: 1,
        dataStreamRouteID: manifestRoute.id,
        config,
      });
    }
  ),

  // --> Programs
  http.get(`${API_ENDPOINTS.entities}/:entity_id/programs`, ({ params }) => {
    const { entity_id } = params;

    if (!entity_id || entity_id == "NaN") {
      return new HttpResponse(null, { status: 400 });
    }

    const entityIdStr = Array.isArray(entity_id) ? entity_id[0] : entity_id;
    const entityIdNumber = parseInt(entityIdStr, 10);

    const programs = entityIdNumber == 1 ? mockPrograms1 : mockPrograms2;
    return HttpResponse.json(programs);
  }),
  http.get(
    `${API_ENDPOINTS.entities}/:entity_id/programs/:program_id`,
    ({ params }) => {
      const { entity_id, program_id } = params;

      if (
        !entity_id ||
        !program_id ||
        entity_id == "NaN" ||
        program_id == "NaN"
      ) {
        return new HttpResponse(null, { status: 400 });
      }

      const entityIdStr = Array.isArray(entity_id) ? entity_id[0] : entity_id;
      const entityIdNumber = parseInt(entityIdStr, 10);
      const programIdStr = Array.isArray(program_id)
        ? program_id[0]
        : program_id;
      const programIdNumber = parseInt(programIdStr, 10);

      const programs = entityIdNumber == 1 ? mockPrograms1 : mockPrograms2;
      const program = programs.find((el: Program) => el.id == programIdNumber);
      return HttpResponse.json(program);
    }
  ),
  http.post(
    `${API_ENDPOINTS.entities}/:entity_id/programs`,
    async ({ request, params }) => {
      const { entity_id } = params;
      const { name } = (await request.json()) as CreateProgramBody;

      if (!name || !entity_id || entity_id == "NaN") {
        return new HttpResponse(null, { status: 400 });
      }

      const entityIdStr = Array.isArray(entity_id) ? entity_id[0] : entity_id;
      const entityIdNumber = parseInt(entityIdStr, 10);

      return HttpResponse.json({ id: 1, entityID: entityIdNumber, name });
    }
  ),

  // --> Routes
  http.get(
    `${API_ENDPOINTS.dataStreams}/:datastream_id/routes`,
    ({ params }) => {
      const { datastream_id } = params;

      if (!datastream_id || datastream_id == "NaN") {
        return new HttpResponse(null, { status: 400 });
      }

      const datastreamIdStr = Array.isArray(datastream_id)
        ? datastream_id[0]
        : datastream_id;
      const datastreamIdNumber = parseInt(datastreamIdStr, 10);

      const routes = datastreamIdNumber == 1 ? mockRoutes1 : mockRoutes2;
      return HttpResponse.json(routes);
    }
  ),
  http.get(
    `${API_ENDPOINTS.dataStreams}/:datastream_id/routes/:route_id`,
    ({ params }) => {
      const { datastream_id, route_id } = params;

      if (
        !datastream_id ||
        !route_id ||
        datastream_id == "NaN" ||
        route_id == "NaN"
      ) {
        return new HttpResponse(null, { status: 400 });
      }

      const datastreamIdStr = Array.isArray(datastream_id)
        ? datastream_id[0]
        : datastream_id;
      const datastreamIdNumber = parseInt(datastreamIdStr, 10);
      const routeIdStr = Array.isArray(route_id) ? route_id[0] : route_id;
      const routeIdNumber = parseInt(routeIdStr, 10);

      const routes = datastreamIdNumber == 1 ? mockRoutes1 : mockRoutes2;
      const route = routes.find((el: Route) => el.id == routeIdNumber);
      return HttpResponse.json(route);
    }
  ),
  http.post(
    `${API_ENDPOINTS.dataStreams}/:datastream_id/routes`,
    async ({ request, params }) => {
      const { datastream_id } = params;
      const { name } = (await request.json()) as CreateRouteBody;

      if (!datastream_id || datastream_id == "NaN" || !name) {
        return new HttpResponse(null, { status: 400 });
      }

      const datastreamIdStr = Array.isArray(datastream_id)
        ? datastream_id[0]
        : datastream_id;
      const datastreamIdNumber = parseInt(datastreamIdStr, 10);

      return HttpResponse.json({
        id: 1,
        dataStreamID: datastreamIdNumber,
        name,
      });
    }
  ),

  // --> AuthGroups
  http.get(`${API_ENDPOINTS.entities}/:entity_id/groups`, ({ params }) => {
    const { entity_id } = params;

    if (!entity_id || entity_id == "NaN") {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockAuthgroups);
  }),

  http.post(
    `${API_ENDPOINTS.entities}/:entity_id/groups`,
    async ({ request, params }) => {
      const { entity_id } = params;
      const { name } = (await request.json()) as CreateAuthGroupBody;

      if (!entity_id || !name || entity_id == "NaN" || name == "NaN") {
        return new HttpResponse(null, { status: 400 });
      }
      return new HttpResponse(null, { status: 200 });
    }
  ),

  // --> Identities
  http.get(`${API_ENDPOINTS.identities}`, () => {
    return HttpResponse.json(mockIdentities);
  }),

  // --> UserToAuthGroup
  http.post(
    `${API_ENDPOINTS.groups}/:authgroup_id/identities`,
    async ({ request, params }) => {
      const { authgroup_id } = params;
      const { identityID } = (await request.json()) as CreateIdentityGroupBody;

      if (!authgroup_id || !identityID || authgroup_id == "NaN") {
        return new HttpResponse(null, { status: 400 });
      }
      return new HttpResponse(null, { status: 200 });
    }
  ),

  // --> DataStreamRouteGroups
  http.post(`${API_ENDPOINTS.dataStreamRouteGroups}`, async ({ request }) => {
    const { authgroupID, datastreamRouteID } =
      (await request.json()) as CreateDatastreamRouteGroupBody;

    if (!authgroupID || !datastreamRouteID) {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 200 });
  }),
];
