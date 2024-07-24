package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programUsersRouting() {

    route("/programs") {
        get("{prog_id}/users") { }
        get("{prog_id}/users/{user_id}") { }
        post("{prog_id}/users/{user_id}") { }
        delete("{prog_id}/users/{user_id}") { }
    }
}
