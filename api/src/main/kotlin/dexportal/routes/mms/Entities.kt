package dexportal.routes.mms

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.entities() {
    route("/entities") {
        get {
            call.respond(HttpStatusCode.OK, "You have hit entities")
        }
    }
}
