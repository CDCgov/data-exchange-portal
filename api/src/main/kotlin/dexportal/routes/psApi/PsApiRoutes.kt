package dexportal.routes.psApi

import io.ktor.client.*
import io.ktor.server.routing.*
import io.ktor.server.auth.*

fun Route.psAPI(client: HttpClient) {
    route("/ps-api") {
        authenticate("auth-bearer") {
            fileSubmissions(client)
            reportCounts(client)
        }
    }
}
