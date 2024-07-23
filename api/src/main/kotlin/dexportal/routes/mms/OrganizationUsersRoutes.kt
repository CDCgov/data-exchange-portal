package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationUsersRouting() {

    route("/organizations") {
        get("{organizationId}/users") { }
        get("{organizationId}/users/{userId}") { }
        post("{organizationId}/users/{userId}") { }
        delete("{organizationId}/users/{userId}") { }
    }
}
