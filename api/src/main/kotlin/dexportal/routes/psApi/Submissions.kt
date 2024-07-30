package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import com.dexportal.SubmissionsQuery
import dexportal.utils.InvalidDateFormatException
import dexportal.utils.processDateString

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.submissionsRoute(apolloClient: ApolloClient) {
    route("/file-submissions") {
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

            val pageSize = call.request.queryParameters["page_size"]?.toIntOrNull() ?: 10
            val pageNumber = call.request.queryParameters["page_number"]?.toIntOrNull() ?: 1
            val sortBy = call.request.queryParameters["sort_by"] ?: ""
            val sortOrder = call.request.queryParameters["sort_order"] ?: ""
            // TODO: Add jurisdiction and senderId once PS-API has updated its query

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
                    SubmissionsQuery(
                        data_stream = dataStream,
                        route = dataRoute,
                        date_start = cleanedDateStart,
                        date_end = cleanedDateEnd,
                        page_size = pageSize,
                        page_number = pageNumber,
                        sort_by = sortBy,
                        sort_order = sortOrder
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
