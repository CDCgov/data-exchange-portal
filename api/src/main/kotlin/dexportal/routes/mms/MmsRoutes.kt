package dexportal.routes.mms

import dexportal.config.ConfigLoader
import io.ktor.server.routing.*
import dexportal.middleware.authenticate
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Route.mms(client: HttpClient) {
    val mmsUrl = ConfigLoader.getMMSAPIUrl()
    route("/mms") {
        route("/health") {
            get {
                try {
                    val response: HttpResponse = client.request("${mmsUrl}/health")
                    val responseBody: String = response.bodyAsText()
                    call.respondText(responseBody, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(e)
                }
            }
        }
        datastreams(client, mmsUrl)
        entities(client, mmsUrl)
    }
}
