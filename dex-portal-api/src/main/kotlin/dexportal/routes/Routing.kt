package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

import com.apollographql.apollo3.ApolloClient
import com.dexportal.`dex-portal-api`.CharactersQuery

fun Application.configureRouting() {
    routing {
        get("/") {
             val apolloClient = ApolloClient.Builder().serverUrl("https://swapi-graphql.netlify.app/.netlify/functions/index").build()
             val response = apolloClient.query(CharactersQuery()).execute()
            println(response.data)
            call.respondText(response.data.toString())
        }
        authRoutes()
    }
}
