package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.authGroupUserJoinsRouting() {
    route("/users/{user_id}/auth-groups") {
        get { }
        get("{authgroup_id}") { }
        post("{authgroup_id}") { }
        delete("{authgroup_id}") { }
    }
}
