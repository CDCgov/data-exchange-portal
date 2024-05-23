package dexportal.routes.psApi

import io.ktor.client.*
import io.ktor.server.routing.*

fun Route.psAPI(client: HttpClient) {
    route("/ps-api") {
        fileSubmissions(client)
        reportCounts(client)
        submissionDetails(client)
    }
}
