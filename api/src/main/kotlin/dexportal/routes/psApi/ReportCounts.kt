package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient

import dexportal.config.ConfigLoader
import dexportal.utils.processDateString
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

import com.apollographql.apollo3.api.toJson
import com.dexportal.SampleQuery

fun Route.reportCounts(apolloClient: ApolloClient) {
    route("/report-counts") {
        get {
            // Make request to GraphQL endpoint, return it as json
            val response = apolloClient.query(SampleQuery()).execute()
            val jsonData = response.data?.toJson()
            call.respond(HttpStatusCode.OK, jsonData.toString())

//            call.respond(HttpStatusCode.OK, "This is the /report-counts endpoint")
        }
    }
}
// fun Route.reportCounts(client: HttpClient) {
//     val psApiUrl = ConfigLoader.getPsApiEndpoint()
//
//     route("/report-counts") {
//         get {
//             val dataStreamId = call.request.queryParameters["data_stream_id"] ?: ""
//             val dataStreamRoute = call.request.queryParameters["data_stream_route"] ?: ""
//             val dateStart = call.request.queryParameters["date_start"] ?: ""
//             val dateEnd = call.request.queryParameters["date_end"] ?: ""
//             val daysInterval = call.request.queryParameters["days_interval"] ?: ""
//
//             val authToken = call.request.headers["Authorization"]
//
//             val cleanedDateStart = processDateString(dateStart) ?: ""
//             val cleanedDateEnd = processDateString(dateEnd) ?: ""
//
//             try {
//                 val response: HttpResponse = client.get("$psApiUrl/api/report/counts/submissions/summary") {
//                     header("Authorization", authToken)
//                     parameter("data_stream_id", dataStreamId)
//                     parameter("data_stream_route", dataStreamRoute)
//                     if (cleanedDateStart.isNotEmpty()) {
//                         parameter("date_start", cleanedDateStart)
//                     }
//                     if (cleanedDateEnd.isNotEmpty()) {
//                         parameter("date_end", cleanedDateEnd)
//                     }
//                     if (daysInterval.isNotEmpty()) {
//                         parameter("days_interval", daysInterval)
//                     }
//                 }
//                 val responseBody: String = response.bodyAsText()
//                 call.respondText(responseBody)
//             } catch (e: Exception) {
//                 call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
//             }
//         }
//     }
// }
