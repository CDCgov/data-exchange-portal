package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programDataStreamsRouting() {

    route("/programs") {
        get("{programId}/datastreams") { }
        get("{programId}/datastreams/{dataStreamId}") { }
        post("{programId}/datastreams/{dataStreamId}") { }
        delete("{programId}/datastreams/{dataStreamId}") { }
    }
}
