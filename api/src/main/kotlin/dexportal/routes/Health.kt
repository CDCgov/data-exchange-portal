package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.client.*

import com.apollographql.apollo3.ApolloClient
import com.dexportal.HealthQuery

import dexportal.config.ConfigLoader
import io.ktor.client.request.*

fun Route.healthCheck(client: HttpClient, apolloClient: ApolloClient) {
    get("/health") {
        val mmsUrl = ConfigLoader.getMmsApiEndpoint()
        val healthCheckResults = mutableListOf<String>()

        try {
            client.get("$mmsUrl/health")
            healthCheckResults.add("MMS API Service Status: OK")
        } catch (e: Exception) {
            healthCheckResults.add("MMS API Service Status: Error\n${e.message ?: "An unknown error occurred"}")
        }

        try {
            apolloClient.query(HealthQuery()).execute()
            healthCheckResults.add("PS API Service Status: OK")
        } catch (e: Exception) {
            healthCheckResults.add("PS API Service Status: Error\n${e.message ?: "An unknown error occurred"}")
        }

        val response = healthCheckResults.joinToString(separator = "\n\n")
        call.respondText(response)
    }
}
