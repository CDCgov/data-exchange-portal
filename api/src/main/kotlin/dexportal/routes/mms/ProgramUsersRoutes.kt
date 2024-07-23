package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programUsersRouting() {

    route("/programs") {
        get("{programId}/users") { }
        get("{programId}/users/{userId}") { }
        post("{programId}/users/{userId}") { }
        delete("{programId}/users/{userId}") { }
    }
}
