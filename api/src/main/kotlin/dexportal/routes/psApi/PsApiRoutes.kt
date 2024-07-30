package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import io.ktor.server.routing.*

fun Route.psAPI(apolloClient: ApolloClient) {
    route("/ps-api") {
        countsRoute(apolloClient) // See the reportCounts endpoint for an example of making a GraphQL query
        submissionsRoute(apolloClient)
        submissionDetails(apolloClient)
    }
}
