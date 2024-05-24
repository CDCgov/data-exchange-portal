
package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.manifests() {
    route("/datastreams/{stream}/routes/{route}/manifests") {
        get { }
        post { }
        delete("{id}") { }
    }
}
