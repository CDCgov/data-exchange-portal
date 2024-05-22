package dexportal.routes.mms

import io.ktor.server.routing.*
import dexportal.middleware.authenticate

fun Route.mms() {
    route("/mms") {
        datastreams()
        entities()
    }
}
