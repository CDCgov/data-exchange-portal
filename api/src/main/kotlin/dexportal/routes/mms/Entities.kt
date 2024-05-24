package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.entities() {
    route("/entities") {
        get { }
        get("{id}") { }
        post { }
        delete("{id}") { }
    }
    route("/entities/{entity_id}/programs") {
        get { }
        get("{id}") { }
        post { }
        delete("{id}") { }
    }
    route("/entities/{entity_id}/groups") {
        get { }
        get("{id}") { }
        post { }
        delete("{id}") { }
    }
}
