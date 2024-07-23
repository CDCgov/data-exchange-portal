package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programAuthGroupsRouting() {

    route("/programs") {
        get("{programId}/auth-groups") { }
        get("{programId}/auth-groups/{authGroupId}") { }
        post("{programId}/auth-groups") { }
        put("{programId}/auth-groups/{authGroupId}") { }
        delete("{programId}/auth-groups/{authGroupId}") { }
    }
}
