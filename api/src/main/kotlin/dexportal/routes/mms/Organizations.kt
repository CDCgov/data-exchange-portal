package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.organizationsRouting() {
    route("/organizations") {
        get { }
        get("{id}") { }
        post { }
        put("{id}") { }
        delete("{id}") { }
    }
}
