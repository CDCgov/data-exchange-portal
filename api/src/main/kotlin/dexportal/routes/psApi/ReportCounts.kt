package dexportal.routes.psApi

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.reportCounts() {
    route("/report-counts") {
        get {
            call.respond(HttpStatusCode.OK, "You have hit counts")
        }
    }
}
