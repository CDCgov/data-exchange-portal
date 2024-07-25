package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programDataStreamsRouting() {

    route("/programs") {
        get("{prog_id}/datastreams") { }
        get("{prog_id}/datastreams/{datastream_id}") { }
        post("{prog_id}/datastreams/{datastream_id}") { }
        delete("{prog_id}/datastreams/{datastream_id}") { }
    }
}
