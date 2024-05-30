package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.datastreamRouteGroups() {
    route("/datastream-routes-groups") {
        get("/authgroup/{authgroupId}") { }
        get("/route/{datastreamrouteId}") { }
        post { }
        delete("/{id}") { }
    }
}
