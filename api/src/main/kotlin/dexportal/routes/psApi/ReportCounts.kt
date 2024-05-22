package dexportal.routes.psApi

import ReportCounts
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.apollographql.apollo3.ApolloClient

fun Route.reportCounts() {
    val psApiEndpoint = ConfigLoader.getPsApiEndpoint()

    route("/report-counts") {
        get {
            val apolloClient = ApolloClient.Builder().serverUrl(psApiEndpoint).build()
            val response = apolloClient.query(ReportCounts()).execute()
            // Transform data into expected model, validate, return as JSON
            call.respond(HttpStatusCode.OK, response.data.toString())
        }
    }
}
