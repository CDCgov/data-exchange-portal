
package dexportal.routes.mms

import io.ktor.server.routing.*

fun Route.manifestRouting() {
    route("/datastreams/{stream}/routes/{route}/manifest") {
        get { }
        post { }
        put { }
        delete { }
    }
}
