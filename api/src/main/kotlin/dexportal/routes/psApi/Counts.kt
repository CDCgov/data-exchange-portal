package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import com.dexportal.CountsQuery
import dexportal.utils.InvalidDateFormatException
import dexportal.utils.processDateString

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.countsRoute(apolloClient: ApolloClient) {
    route("/report-counts") {
        get {
            val dataStream = call.request.queryParameters["data_stream_id"]
            if (dataStream == null || dataStream == "") {
                call.respond(HttpStatusCode.BadRequest, "Datastream name must be provided")
                return@get
            }

            val dataRoute = call.request.queryParameters["data_stream_route"] ?: ""

            val dateStart = call.request.queryParameters["date_start"]
            val dateEnd = call.request.queryParameters["date_end"]
            if (dateStart == null || dateStart == "" || dateEnd == null || dateEnd == "") {
                call.respond(HttpStatusCode.BadRequest, "Date start and date end must be provided")
                return@get
            }

            val authToken = call.request.headers["Authorization"]
            if (authToken == null || authToken == "") {
                call.respond(HttpStatusCode.BadRequest, "Authorization token must be provided")
                return@get
            }

            val cleanedDateStart: String?
            val cleanedDateEnd: String?

            try {
                cleanedDateStart = processDateString(dateStart)
                cleanedDateEnd = processDateString(dateEnd)
            } catch (e: InvalidDateFormatException) {
                call.respond(HttpStatusCode.BadRequest, "${e.message}")
                return@get
            }

            try {
                val response = apolloClient.query(
                    CountsQuery(
                        dataStream, dataRoute, cleanedDateStart, cleanedDateEnd
                    )
                ).addHttpHeader("Authorization", authToken).execute()
                val jsonData = response.data?.toJson()
                call.respond(HttpStatusCode.OK, jsonData.toString())
            } catch (e: Exception) {
                call.respond(
                    HttpStatusCode.InternalServerError,
                    "An error occurred making the request to PS-API: ${e.message}"
                )
            }
        }
    }
}
