package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.submissionDetails(apolloClient: ApolloClient) {
    route("/submission-details") {
        get {
            call.respond(HttpStatusCode.OK, "This is the /submission-details endpoint")
        }
    }
}
