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

    val headers = call.request.headers

    val requestBody = call.receiveText()

    val response = client.request(externalApiUrl) {
        method = call.request.httpMethod
        url {
            queryParams.forEach { key, values ->
                parameter(key, values)
            }
        }
        headers {
            headers.forEach { key, values ->
                values.forEach { value ->
                    append(key, value)
                }
            }
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
}
