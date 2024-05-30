package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.server.auth.*

fun Application.configureRouting() {
    val client = HttpClient(CIO)

    val mmsUrl = ConfigLoader.getMmsApiEndpoint()

    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        // Todo: Revisit this once we've debugged the 403 issue
        get("/health") {
            val response: HttpResponse = client.get("$mmsUrl/health")
            val responseBody: String = response.bodyAsText()
            call.respondText("MMS /health Response:", responseBody)
        }
        authRoutes(client)
        authenticate("auth-bearer") {
            mms(client)
            psAPI(client)
        }
    }

    environment.monitor.subscribe(ApplicationStopped) {
        client.close()
    }
}
