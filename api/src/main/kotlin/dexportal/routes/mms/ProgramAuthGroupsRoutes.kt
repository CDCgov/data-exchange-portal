package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programAuthGroupsRouting() {

    route("/programs") {
        get("{prog_id}/auth-groups") { }
        get("{prog_id}/auth-groups/{authgroup_id}") { }
        post("{prog_id}/auth-groups") { }
        put("{prog_id}/auth-groups/{authgroup_id}") { }
        delete("{prog_id}/auth-groups/{authgroup_id}") { }
    }
}
