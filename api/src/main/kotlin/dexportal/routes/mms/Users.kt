package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.usersRouting() {
    route("/users") {
        get { }
        get("{id}") { }
        post { }
        put("{id}") { }
        put("{id}/privileges") { }
        delete("{id}") { }
    }
}
