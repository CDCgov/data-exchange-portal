package dexportal.routes.mms

import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Route.datastreams(client: HttpClient, url: String) {
    route("/datastreams") {
        get {
            try {
                val response: HttpResponse = client.request("${url}/datastreams")
                val responseBody: String = response.bodyAsText()
                call.respondText(responseBody, ContentType.Application.Json)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
            }
        }
    }
}
