package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import com.dexportal.HealthQuery

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.healthCheckRoute(apolloClient: ApolloClient) {
    route("/health") {
        get {
            val response = apolloClient.query(HealthQuery()).execute()
            val jsonData = response.data?.toJson()
            call.respond(HttpStatusCode.OK, jsonData.toString())
        }
    }
}
