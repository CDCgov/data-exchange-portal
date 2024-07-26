package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import com.dexportal.SubmissionsQuery
import dexportal.utils.processDateString

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.submissionsRoute(apolloClient: ApolloClient) {
    route("/file-submissions") {
        get {
            val dataStream = call.request.queryParameters["data_stream_id"] ?: ""
            val dataRoute = call.request.queryParameters["data_stream_route"] ?: ""
            val dateStart = call.request.queryParameters["date_start"] ?: ""
            val dateEnd = call.request.queryParameters["date_end"] ?: ""
            val pageSize = call.request.queryParameters["page_size"]?.toIntOrNull() ?: 10
            val pageNumber = call.request.queryParameters["page_number"]?.toIntOrNull() ?: 1
            val sortBy = call.request.queryParameters["sort_by"] ?: ""
            val sortOrder = call.request.queryParameters["sort_order"] ?: ""
            // TODO: Add jurisdiction and senderId once PS-API has updated its query

            val authToken = call.request.headers["Authorization"] ?: ""

            val cleanedDateStart = processDateString(dateStart) ?: ""
            val cleanedDateEnd = processDateString(dateEnd) ?: ""

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
                call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
            }
        }
    }
}
