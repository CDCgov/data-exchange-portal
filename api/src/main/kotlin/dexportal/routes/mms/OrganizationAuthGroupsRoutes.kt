package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationAuthGroupsRouting() {

    route("/organizations") {
        get("{orgId}/auth-groups") { }
        get("{orgId}/auth-groups/{authGroupId}") { }
        post("{orgId}/auth-groups") { }
        put("{orgId}/auth-groups/{authGroupId}") { }
        delete("{orgId}/auth-groups/{authGroupId}") { }
    }
}
