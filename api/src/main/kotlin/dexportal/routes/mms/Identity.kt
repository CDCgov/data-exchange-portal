package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.identities() {
    route("/identities") {
        get { }
        get("{id}") { }
        get("{id}/datastreams-with-routes") { }
        post { }
        delete("{id}") { }
    }
    route("/groups/{ag_id}/identities") {
        get { }
        post { }
        delete("{id}") { }
    }
    route("/current-user") {
        get { }
        get("/datastreams-with-routes") { }
    }
}
