package dexportal.routes.mms

import dexportal.config.ConfigLoader
import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*

fun Route.mms(client: HttpClient) {
    val mmsUrl = ConfigLoader.getMmsApiEndpoint()
    route("/mms/{...}") {
        handle {
            val basePath = "/mms"
            val originalUri = call.request.uri
            val pathAndQuery = originalUri.substringAfter(basePath)
            val requestBody = call.receiveText()
            val externalApiUrl = "$mmsUrl$pathAndQuery"

            try {
                val response: HttpResponse = client.request(externalApiUrl) {
                    method = call.request.httpMethod
                    headers {
                        appendAll(call.request.headers)
                    }
                    if (requestBody.isNotEmpty()) {
                        setBody(requestBody)
                    }
                }

                val status = response.status
                val responseBody: String = response.bodyAsText()

                if (status == HttpStatusCode.OK || status == HttpStatusCode.Created) {
                    call.respondText(responseBody, ContentType.Application.Json)
                } else {
                    call.respond(status, responseBody)
                }
            } catch (e: ClientRequestException) {
                call.respond(HttpStatusCode.Forbidden, "Access Forbidden: ${e.message}")
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Internal Server Error: ${e.message}")
            }
        }
    }
}
