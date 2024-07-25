package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import io.ktor.client.*
import io.ktor.server.routing.*

fun Route.psAPI(apolloClient: ApolloClient) {
    route("/ps-api") {
//        authenticate()
        reportCounts(apolloClient) // See the reportCounts endpoint for an example of making a GraphQL query
        fileSubmissions(apolloClient)
        submissionDetails(apolloClient)
    }
}
