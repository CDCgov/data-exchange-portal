package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.datastreams() {
    route("/datastreams") {
        get { }
        get("{id}") { }
        post { }
        put { }
        delete("{id}") { }
    }
    route("/datastreams/{datastream_id}/routes") {
        get { }
        get("{id}") { }
        post { }
        delete("{id}") { }
    }
}
