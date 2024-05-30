package dexportal.middleware

import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.util.pipeline.*

suspend fun PipelineContext<Unit, ApplicationCall>.requestProxy(
    client: HttpClient, externalBaseUrl: String, prefixToRemove: String
) {
    val path = call.request.uri.removePrefix(prefixToRemove)
    val externalApiUrl = "${externalBaseUrl}${path}"

    val queryParams = call.request.queryParameters

    val headers = call.request.headers

    val requestBody = call.receiveText()

    // Log request details
    call.application.log.info("Proxying request to: $externalApiUrl")
    call.application.log.info("Query Parameters: $queryParams")
    call.application.log.info("Headers: $headers")
    call.application.log.info("Request Body: $requestBody")

    val response = client.request(externalApiUrl) {
        method = call.request.httpMethod
        url {
            call.request.queryParameters.forEach { key, values ->
                parameter(key, values)
            }
        }
        headers {
            call.request.headers.forEach { key, values ->
                values.forEach { value ->
                    append(key, value)
                }
            }
        }
        if (requestBody.isNotEmpty()) {
           setBody(call.receiveText())
        }
    }

    // Log response details
    call.application.log.info("Received response status: ${response.status}")
    call.application.log.info("Received response body: ${response.bodyAsText()}")

    val status = response.status
    val responseBody: String = response.bodyAsText()

    if (status == HttpStatusCode.OK || status == HttpStatusCode.Created) {
        call.respondText(responseBody, ContentType.Application.Json)
    } else {
        call.respond(status, responseBody)
    }
}
