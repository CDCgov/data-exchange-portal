package dexportal.routes.psApi

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.apollographql.apollo3.ApolloClient
import dexportal.config.ConfigLoader
import kotlinx.serialization.*

import com.dexportal.CharactersQuery
import kotlinx.serialization.json.Json

fun Route.reportCounts() {
    val psApiEndpoint = ConfigLoader.getPsApiEndpoint()

    route("/report-counts") {
        get {
            val apolloClient = ApolloClient.Builder().serverUrl(psApiEndpoint).build()
            val response = apolloClient.query(CharactersQuery()).execute()

            //val jsonData = Json.encodeToString(response.data?.allPeople)

            call.respond(HttpStatusCode.OK, response.data.toString())
        }
    }
}
