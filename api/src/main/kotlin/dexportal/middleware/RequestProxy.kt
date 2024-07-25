package dexportal.middleware

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.util.pipeline.*

suspend fun PipelineContext<Unit, ApplicationCall>.requestProxy(
    client: HttpClient, externalBaseUrl: String, prefixToRemove: String
) {
    val path = call.request.uri.removePrefix(prefixToRemove)
    val externalApiUrl = "${externalBaseUrl}${path}"

    val queryParams = call.request.queryParameters
    val authToken = call.request.headers["Authorization"]
    val contentType = call.request.headers["Content-Type"]
    val requestBody = call.receiveText()

    call.application.log.info("Proxying request to: $externalApiUrl")
    call.application.log.info("Auth Header: $authToken")
    call.application.log.info("Request Body: $requestBody")

    try {
        val response = client.request(externalApiUrl) {
            method = call.request.httpMethod
            url {
                queryParams.forEach { key, values ->
                    parameter(key, values)
                }
            }
            if (!authToken.isNullOrEmpty()) {
                header("Authorization", authToken)
            }
            if (!contentType.isNullOrEmpty()) {
                header("Content-Type", contentType)
            }
            if (requestBody.isNotEmpty()) {
                setBody(requestBody)
            }
        }

        call.application.log.info("Received response status: ${response.status}")
        call.application.log.info("Received response body: ${response.bodyAsText()}")

        val status = response.status
        val responseBody: String = response.bodyAsText()

        if (status == HttpStatusCode.OK || status == HttpStatusCode.Created) {
            call.respondText(responseBody, ContentType.Application.Json)
        } else {
            call.respond(status, responseBody)
        }
    } catch (e: Exception) {
        call.application.log.error("Error during proxying request: ${e.message}")
        call.respond(HttpStatusCode.InternalServerError, "Internal Server Error")
    }
}
