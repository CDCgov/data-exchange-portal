package dexportal

import dexportal.routes.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.auth.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module).start(wait = true)
}

fun Application.configureAuthentication() {
    install(Authentication) {
        bearer("auth-bearer") {
            realm = "Access to the '/' path"
            authenticate { tokenCredential ->
                if (tokenCredential.token.isNotEmpty()) {
                    UserIdPrincipal("valid-user")
                } else {
                    null
                }
            }
        }
    }
}

fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json()
    }
}

fun Application.configureCORS() {
    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Patch)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowCredentials = true
    }
}

fun Application.module() {
    configureAuthentication()
    configureSerialization()
    configureCORS()
    configureHTTP()
    configureRouting()
}
