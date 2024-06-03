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
            client.get("$mmsUrl/health")
            healthCheckResults.add("MMS API Service Status: OK")
        } catch (e: Exception) {
            healthCheckResults.add("MMS API Service Status: Error\n${e.message ?: "An unknown error occurred"}")
        }

        try {
            client.get("$psApiUrl/health")
            healthCheckResults.add("PS API Service Status: OK")
        } catch (e: Exception) {
            healthCheckResults.add("PS API Service Status: Error\n${e.message ?: "An unknown error occurred"}")
        }

        val response = healthCheckResults.joinToString(separator = "\n\n")
        call.respondText(response)
    }
}
