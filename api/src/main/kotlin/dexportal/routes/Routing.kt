package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        authRoutes()
        mms()
        psAPI()
    }
}
