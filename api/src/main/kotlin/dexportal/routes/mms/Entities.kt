package dexportal.routes.mms

import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import dexportal.models.mms.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun Route.entities(client: HttpClient, url: String) {
    route("/entities") {
        get {
            try {
                val authToken = call.request.headers["Authorization"]
                val response: HttpResponse = client.request("${url}/entities") {
                    header("Authorization", authToken)
                }
                val responseBody: String = response.bodyAsText()
                call.respondText(responseBody, ContentType.Application.Json)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.message ?: "An unknown error occurred")
            }
        }
        get("{id}") {
            val idParam = call.parameters["id"]
            val id = idParam?.toIntOrNull()

            if (id != null) {
                try {
                    val authToken = call.request.headers["Authorization"]
                    val response: HttpResponse = client.request("${url}/entities/${id}") {
                        header("Authorization", authToken)
                    }
                    val responseBody: String = response.bodyAsText()
                    call.respondText(responseBody, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error fetching entity")
                }
            } else {
                call.respond(HttpStatusCode.BadRequest, "Missing 'entity_id' parameter")
            }
        }
        post {
            try {
                val authToken = call.request.headers["Authorization"]
                val entity = call.receive<Entity>()
                val response: HttpResponse = client.post("${url}/entities") {
                    header("Authorization", authToken)
                    contentType(ContentType.Application.Json)
                    setBody(Json.encodeToString(entity))
                }
                val responseBody: String = response.bodyAsText()
                call.respondText(responseBody, ContentType.Application.Json)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error creating entity")
            }
        }
    }
}
