package dexportal.middleware

import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.application.ApplicationCallPipeline.ApplicationPhase.Plugins
import io.ktor.server.response.*

fun Route.authenticate() {
    intercept(Plugins) {
        val authToken = call.request.headers["Authorization"]
        if (authToken.isNullOrEmpty()) {
            call.respond(HttpStatusCode.Unauthorized, "Missing or invalid auth token")
            finish()
        }
    }
}
