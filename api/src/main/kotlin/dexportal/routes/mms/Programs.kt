package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.programsRouting() {
    route("/programs") {
        get { }
        get("{id}") { }
        post { }
        put("{id}") { }
        delete("{id}") { }
    }
}
