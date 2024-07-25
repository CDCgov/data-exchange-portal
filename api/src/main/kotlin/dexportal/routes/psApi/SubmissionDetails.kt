package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient

import dexportal.config.ConfigLoader
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.submissionDetails(apolloClient: ApolloClient) {
    route("/submission-details") {
        get {
            call.respond(HttpStatusCode.OK, "This is the /submission-details endpoint")
// fun Route.submissionDetails(client: HttpClient) {
//     val psApiUrl = ConfigLoader.getPsApiEndpoint()
//
//     route("/submission-details") {
//         get {
//             val uploadId = call.request.queryParameters["upload_id"] ?: ""
//
//             val authToken = call.request.headers["Authorization"]
//
//             try {
//                 val response: HttpResponse = client.get("$psApiUrl/api/report/uploadId/$uploadId") {
//                     header("Authorization", authToken)
//                 }
//                 val responseBody: String = response.bodyAsText()
//                 call.respondText(responseBody)
//             } catch (e: Exception) {
//                 call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
//             }
        // }
    }
}
