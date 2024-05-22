package dexportal.routes

import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import dexportal.middleware.authenticate

fun Route.protectedRoutes() {
    route("/protected") {
        authenticate()
        get {
            call.respond(HttpStatusCode.OK, "You have accessed a protected route!")
        }
    }
}
