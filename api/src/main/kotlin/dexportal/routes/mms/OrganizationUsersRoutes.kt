package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationUsersRouting() {

    route("/organizations") {
        get("{org_id}/users") { }
        get("{org_id}/users/{user_id}") { }
        post("{org_id}/users/{user_id}") { }
        delete("{org_id}/users/{user_id}") { }
    }
}
