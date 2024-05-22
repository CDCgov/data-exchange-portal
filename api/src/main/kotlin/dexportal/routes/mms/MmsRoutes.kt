package dexportal.routes.mms

import dexportal.config.ConfigLoader
import io.ktor.server.routing.*
import dexportal.middleware.authenticate
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Route.mms() {
    route("/mms") {
        route("/health") {
            val client = HttpClient(CIO)
            val url = ConfigLoader.getMMSAPIUrl()
            get {
                try {
                    val response: HttpResponse = client.request(url)
                    val responseBody: String = response.bodyAsText()
                    call.respondText(responseBody, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(e)
                } finally {
                    client.close()
                }
            }
        }
        datastreams()
        entities()
    }
}
