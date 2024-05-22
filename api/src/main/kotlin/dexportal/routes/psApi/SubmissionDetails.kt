package dexportal.routes.psApi

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.submissionDetails() {
    route("/submission-details") {
        get {
            call.respond(HttpStatusCode.OK, "You have hit submission details")
        }
    }
}
