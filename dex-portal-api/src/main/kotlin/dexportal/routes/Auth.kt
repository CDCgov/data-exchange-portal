package dexportal.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

import dexportal.config.AuthConfig
import dexportal.config.ConfigLoader

fun Route.authRoutes() {
    post("/api/token") {
        val authCode = call.request.queryParameters["code"]
        if (authCode == null) {
            call.respond(HttpStatusCode.BadRequest, "Missing 'code' parameter")
            return@post
        }
        val authConfig: AuthConfig = ConfigLoader.loadAuthConfig()

        val grantType = "authorization_code"
        val scope = "dex:status"

        val client = HttpClient(CIO)

        try {
            val body = Parameters.build {
                append("grant_type", grantType)
                append("code", authCode)
                append("client_id", authConfig.samsClientId)
                append("client_secret", authConfig.samsClientSecret)
                append("redirect_uri", authConfig.samsRedirectUrl)
                append("scope", scope)
            }

            val response: HttpResponse = client.post("${authConfig.samsUrl}/auth/oauth/v2/token") {
                contentType(ContentType.Application.FormUrlEncoded)
                setBody(body)
            }

            call.respond(response)
        } catch (e: Exception) {
            call.respond(e)
        } finally {
            client.close()
        }
    }
}
