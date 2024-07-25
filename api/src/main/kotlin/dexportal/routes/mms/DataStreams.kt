package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.dataStreamRouting() {
    route("/datastreams") {
        get { }
        get("{id}") { }
        post { }
        put("{id}") { }
        delete("{id}") { }
    }

    route("/datastreams/{datastream_id}/routes") {
        get { }
        get("{id}") { }
        post { }
        delete("{id}") { }
    }
}
