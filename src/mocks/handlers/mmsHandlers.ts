import { http, HttpResponse } from "msw";
import API_ENDPOINTS from "src/config/api";

import { CreateDataStreamBody, DataStream } from "src/utils/api/dataStreams";
import { CreateEntityBody, Entity } from "src/utils/api/entities";
import { CreateManifestBody, Manifest } from "src/utils/api/manifests";
import { CreateProgramBody, Program } from "src/utils/api/programs";
import { CreateRouteBody, Route } from "src/utils/api/routes";

import mockDataStreams from "src/mocks/data/dataStreams";
import mockEntities from "src/mocks/data/entities";
import mockManifests from "src/mocks/data/manifests";
import { mockPrograms1, mockPrograms2 } from "src/mocks/data/programs";
import mockRoutes from "src/mocks/data/routes";

export const mmsHandlers = [
  // --> Datastreams
  http.get(API_ENDPOINTS.dataStreams, () => {
    return HttpResponse.json(mockDataStreams);
  }),
  http.get(API_ENDPOINTS.dataStream, ({ request }) => {
    const url = new URL(request.url);
    const dataStreamId = url.searchParams.get("datastream_id");

    if (!dataStreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    const dataStream = mockDataStreams.find(
      (el: DataStream) => el.id == dataStreamId
    );
    return HttpResponse.json(dataStream);
  }),
  http.post(API_ENDPOINTS.dataStream, async ({ request }) => {
    const { name, programId } = (await request.json()) as CreateDataStreamBody;

    if (!name || !programId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({ id: 1, name, programId });
  }),

  // --> Entities
  http.get(API_ENDPOINTS.entities, () => {
    return HttpResponse.json(mockEntities);
  }),
  http.get(`${API_ENDPOINTS.entities}/:entity_id`, ({ params }) => {
    const { entity_id } = params;

    if (!entity_id) {
      return new HttpResponse(null, { status: 400 });
    }

    const entity = mockEntities.find((el: Entity) => el.id == entity_id);
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
  http.get(API_ENDPOINTS.manifests, ({ request }) => {
    const url = new URL(request.url);
    const datastreamId = url.searchParams.get("datastream_id");
    const routeId = url.searchParams.get("route_id");

    if (!datastreamId || !routeId) {
      return new HttpResponse(null, { status: 400 });
    }

    const manifests = mockManifests.filter(
      (el: Manifest) => el.datastreamId == datastreamId && el.routeId == routeId
    );
    return HttpResponse.json(manifests);
  }),
  http.get(API_ENDPOINTS.manifest, ({ request }) => {
    const url = new URL(request.url);
    const datastreamId = url.searchParams.get("datastream_id");
    const routeId = url.searchParams.get("route_id");
    const manifestId = url.searchParams.get("manifest_id");

    if (!datastreamId || !routeId || !manifestId) {
      return new HttpResponse(null, { status: 400 });
    }

    const route = mockManifests.find(
      (el: Manifest) =>
        el.id == routeId &&
        el.datastreamId == datastreamId &&
        el.id == manifestId
    );
    return HttpResponse.json(route);
  }),
  http.post(API_ENDPOINTS.manifest, async ({ request }) => {
    const { datastreamId, routeId, manifestJson } =
      (await request.json()) as CreateManifestBody;

    if (!datastreamId || !routeId || !manifestJson) {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json({ id: 1, datastreamId, routeId, manifestJson });
  }),

  // --> Programs
  http.get(`${API_ENDPOINTS.entities}/:entity_id/programs`, ({ params }) => {
    const { entity_id } = params;

    if (!entity_id || entity_id == "NaN") {
      return new HttpResponse(null, { status: 400 });
    }
    const programs = entity_id == "1" ? mockPrograms1 : mockPrograms2;
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
        entity_id == "NaN"
      ) {
        return new HttpResponse(null, { status: 400 });
      }
      const programs = entity_id == "1" ? mockPrograms1 : mockPrograms2;
      const program = programs.find((el: Program) => el.id == program_id);
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
      return HttpResponse.json({ id: 1, entityId: entity_id, name });
    }
  ),

  // --> Routes
  http.get(API_ENDPOINTS.routes, ({ request }) => {
    const url = new URL(request.url);
    const datastreamId = url.searchParams.get("datastream_id");

    if (!datastreamId) {
      return new HttpResponse(null, { status: 400 });
    }

    const routes = mockRoutes.filter(
      (el: Route) => el.datastreamId == datastreamId
    );
    return HttpResponse.json(routes);
  }),
  http.get(API_ENDPOINTS.route, ({ request }) => {
    const url = new URL(request.url);
    const datastreamId = url.searchParams.get("datastream_id");
    const routeId = url.searchParams.get("route_id");

    if (!datastreamId || !routeId) {
      return new HttpResponse(null, { status: 400 });
    }

    const route = mockRoutes.find(
      (el: Route) => el.id == routeId && el.datastreamId == datastreamId
    );
    return HttpResponse.json(route);
  }),
  http.post(API_ENDPOINTS.route, async ({ request }) => {
    const { datastreamId, name } = (await request.json()) as CreateRouteBody;

    if (!datastreamId || !name) {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json({ id: 1, datastreamId, name });
  }),
];
