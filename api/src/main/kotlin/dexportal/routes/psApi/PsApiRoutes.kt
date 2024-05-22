package dexportal.routes.psApi

import io.ktor.server.routing.*
import dexportal.middleware.authenticate

fun Route.psAPI() {
    route("/ps-api") {
        // authenticate()
        reportCounts()
        fileSubmissions()
        submissionDetails()
    }
}
