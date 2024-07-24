package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationDataStreamsRouting() {

    route("/organizations") {
        get("{org_id}/datastreams") { }
        get("{org_id}/datastreams/{datastream_id}") { }
        post("{org_id}/datastreams/{datastream_id}") { }
        delete("{org_id}/datastreams/{datastream_id}") { }
    }
}
