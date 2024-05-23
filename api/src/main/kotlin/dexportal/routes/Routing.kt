package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*
import com.apollographql.apollo3.ApolloClient
import dexportal.config.ConfigLoader

fun Application.configureRouting() {
    val psApiEndpoint = ConfigLoader.getPsApiEndpoint()
    val apolloClient = ApolloClient.Builder().serverUrl(psApiEndpoint).build()

    routing {
        get("/") {
            call.respondText("Status: OK")
        }
        authRoutes()
        mms()
        psAPI(apolloClient)
    }
}
