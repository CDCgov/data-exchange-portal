package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*

fun Application.configureRouting() {
    val client = HttpClient(CIO)

    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        authRoutes(client)
        mms(client)
        psAPI()
    }

    environment.monitor.subscribe(ApplicationStopped) {
        client.close()
    }
}
