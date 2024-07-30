package dexportal.utils

import com.apollographql.apollo3.api.ApolloResponse
import com.apollographql.apollo3.api.Operation
import io.ktor.server.application.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.countsRoute
import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.toJson
import dexportal.routes.psApi.submissionsRoute

fun <D : Operation.Data> ApolloResponse<D>.toJsonString(): String {
    return this.data?.toJson() ?: ""
}

fun Application.testModule(apolloClient: ApolloClient) {
    routing {
        countsRoute(apolloClient)
        submissionsRoute(apolloClient)
    }
}
