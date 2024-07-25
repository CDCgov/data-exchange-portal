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

fun Route.fileSubmissions(apolloClient: ApolloClient) {
    route("/file-submissions") {
        get {
            call.respond(HttpStatusCode.OK, "This is the /file-submissions endpoint")
// fun Route.fileSubmissions(client: HttpClient) {
//     val psApiUrl = ConfigLoader.getPsApiEndpoint()
//
//     route("/file-submissions") {
//         get {
//             val dataStreamId = call.request.queryParameters["data_stream_id"] ?: ""
//             val dataStreamRoute = call.request.queryParameters["data_stream_route"] ?: ""
//             val dateStart = call.request.queryParameters["date_start"] ?: ""
//             val pageNumber = call.request.queryParameters["page_number"] ?: ""
//             val pageSize = call.request.queryParameters["page_size"] ?: ""
//
//             val authToken = call.request.headers["Authorization"]
//
//             val cleanedDateStart = processDateString(dateStart)
//
//             try {
//                 val response: HttpResponse = client.get("$psApiUrl/api/upload/$dataStreamId") {
//                     header("Authorization", authToken)
//                     parameter("data_stream_route", dataStreamRoute)
//                     parameter("page_number", pageNumber)
//                     parameter("page_size", pageSize)
//                     if (cleanedDateStart != null) {
//                         parameter("date_start", cleanedDateStart)
//                     }
//                 }
//                 val responseBody: String = response.bodyAsText()
//                 call.respondText(responseBody)
//             } catch (e: Exception) {
//                 call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
//             }
        }
    }
}
