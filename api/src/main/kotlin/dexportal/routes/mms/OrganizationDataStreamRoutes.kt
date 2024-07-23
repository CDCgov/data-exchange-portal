package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationDataStreamsRouting() {

    route("/organizations") {
        get("{organizationId}/datastreams") { }
        get("{organizationId}/datastreams/{dataStreamId}") { }
        post("{organizationId}/datastreams/{dataStreamId}") { }
        delete("{organizationId}/datastreams/{dataStreamId}") { }
    }
}
