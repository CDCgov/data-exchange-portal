package dexportal.routes.mms

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.datastreams() {
    route("/datastreams") {
        get {
            call.respond(HttpStatusCode.OK, "You have hit datastreams")
        }
    }
}
