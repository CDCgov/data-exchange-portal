package dexportal.routes.mms

import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Route.entities(client: HttpClient, url: String) {
    route("/entities") {
        get {
            try {
                val response: HttpResponse = client.request("${url}/entities")
                val responseBody: String = response.bodyAsText()
                call.respondText(responseBody, ContentType.Application.Json)
            } catch (e: Exception) {
                call.respond(e)
            }
        }
    }
}