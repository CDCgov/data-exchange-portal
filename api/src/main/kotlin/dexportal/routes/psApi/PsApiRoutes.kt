package dexportal.routes.psApi

import io.ktor.server.routing.*
import io.ktor.server.auth.*

fun Route.psAPI() {
    route("/ps-api") {
        authenticate("auth-bearer") {
            reportCounts()
        }
        fileSubmissions()
    }
}
