package dexportal.routes

import dexportal.config.ConfigLoader
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

fun Application.configureRouting() {
    val client = HttpClient(CIO) {
        install(HttpTimeout) {
            requestTimeoutMillis = 5000
            connectTimeoutMillis = 5000
        }
    }

    val mmsUrl = ConfigLoader.getMmsApiEndpoint()

    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        // Todo: Revisit this once we've debugged the 403 issue
        get("/health") {
            val response: HttpResponse = client.get("$mmsUrl/health")
            val responseBody: String = response.bodyAsText()
            call.application.log.info("Health Check Response: $response")
            call.application.log.info("Health Check ResponseBody: $responseBody")
            call.respondText("MMS /health Response: $responseBody")
        }
        authRoutes(client)
        mms(client)
        psAPI(client)
    }

    environment.monitor.subscribe(ApplicationStopped) {
        client.close()
    }
}
