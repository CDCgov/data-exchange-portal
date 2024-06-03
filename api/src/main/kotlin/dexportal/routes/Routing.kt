package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*

fun Application.configureRouting() {
    val client = HttpClient(CIO) {
        install(HttpTimeout) {
            requestTimeoutMillis = 60000
            connectTimeoutMillis = 5000
        }
    }

    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        healthCheck(client)
        authRoutes(client)
        mms(client)
        psAPI(client)
    }

    environment.monitor.subscribe(ApplicationStopped) {
        client.close()
    }
}
