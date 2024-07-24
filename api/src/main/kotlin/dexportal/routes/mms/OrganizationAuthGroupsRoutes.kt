package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationAuthGroupsRouting() {

    route("/organizations") {
        get("{org_id}/auth-groups") { }
        get("{org_id}/auth-groups/{authgroup_id}") { }
        post("{org_id}/auth-groups") { }
        put("{org_id}/auth-groups/{authgroup_id}") { }
        delete("{org_id}/auth-groups/{authgroup_id}") { }
    }
}
