package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.apollographql.apollo3.api.toJson

// import com.dexportal.ReportCounts

fun Route.reportCounts(apolloClient: ApolloClient) {
    route("/report-counts") {
        get {
            // Make request to GraphQL endpoint, return it as json
            // val response = apolloClient.query(RepoortCountsQuery()).execute()
            // val jsonData = response.data?.toJson()
            // call.respond(HttpStatusCode.OK, jsonData.toString())

            call.respond(HttpStatusCode.OK, "This is the /report-counts endpoint")
        }
    }
}