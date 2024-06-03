package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.statement.*

import dexportal.config.ConfigLoader
import io.ktor.client.request.*

fun Route.healthCheck(client: HttpClient) {
    get("/health") {
        val mmsUrl = ConfigLoader.getMmsApiEndpoint()
        val psApiUrl = ConfigLoader.getPsApiEndpoint()
        val healthCheckResults = mutableListOf<String>()

        try {
            val responseMms: HttpResponse = client.get("$mmsUrl/health")
            val responseMmsBody: String = responseMms.bodyAsText()
            healthCheckResults.add("Mms /health Success:\n\n$responseMmsBody")
        } catch (e: Exception) {
            healthCheckResults.add("Mms /health Error:\n\n${e.message ?: "An unknown error occurred"}")
        }

        try {
            val responsePsApi: HttpResponse = client.get("$psApiUrl/health")
            val responsePsApiBody: String = responsePsApi.bodyAsText()
            healthCheckResults.add("PsApi /health Success:\n\n$responsePsApiBody")
        } catch (e: Exception) {
            healthCheckResults.add("PsApi /health Error:\n\n${e.message ?: "An unknown error occurred"}")
        }

        val response = healthCheckResults.joinToString(separator = "\n--------------------\n")
        call.respondText(response)
    }
}
