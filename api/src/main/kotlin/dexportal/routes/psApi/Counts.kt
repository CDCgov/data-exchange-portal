package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import com.dexportal.CountsQuery
import dexportal.utils.processDateString

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.countsRoute(apolloClient: ApolloClient) {
    route("/report-counts") {
        get {
            val dataStream = call.request.queryParameters["data_stream_id"] ?: ""
            val dataRoute = call.request.queryParameters["data_stream_route"] ?: ""
            val dateStart = call.request.queryParameters["date_start"] ?: ""
            val dateEnd = call.request.queryParameters["date_end"] ?: ""

            val authToken = call.request.headers["Authorization"] ?: ""

            val cleanedDateStart = processDateString(dateStart) ?: ""
            val cleanedDateEnd = processDateString(dateEnd) ?: ""

            try {
                val response = apolloClient.query(
                    CountsQuery(
                        dataStream, dataRoute, cleanedDateStart, cleanedDateEnd
                    )
                ).addHttpHeader(name = "Authorization", value = authToken).execute()
                val jsonData = response.data?.toJson()
                call.respond(HttpStatusCode.OK, jsonData.toString())
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
            }
        }
    }
}
