<<<<<<< Updated upstream:dex-portal-api/src/main/kotlin/dexportal/routes/Routing.kt
package dexportal.routes
=======
package dexportal
>>>>>>> Stashed changes:dex-portal-api/src/main/kotlin/dexportal/plugins/Routing.kt

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

import com.apollographql.apollo3.ApolloClient
import com.dexportal.`dex-portal-api`.CharactersQuery

fun Application.configureRouting() {
    routing {
        get("/") {
<<<<<<< Updated upstream:dex-portal-api/src/main/kotlin/dexportal/routes/Routing.kt
            call.respondText("Status: OK")
=======
             val apolloClient = ApolloClient.Builder().serverUrl("https://swapi-graphql.netlify.app/.netlify/functions/index").build()
             val response = apolloClient.query(CharactersQuery()).execute()
            println(response.data)
            call.respondText(response.data.toString())

            // println("Hero.name=${response.data?.hero?.name}")
>>>>>>> Stashed changes:dex-portal-api/src/main/kotlin/dexportal/plugins/Routing.kt
        }
        authRoutes()
    }
}
