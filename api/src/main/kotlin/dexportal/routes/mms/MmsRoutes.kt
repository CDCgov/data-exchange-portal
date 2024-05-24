package dexportal.routes.mms

import dexportal.config.ConfigLoader
import dexportal.middleware.requestProxy
import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.server.application.*
import io.ktor.server.request.*

fun Route.mms(client: HttpClient) {
    val mmsUrl = ConfigLoader.getMmsApiEndpoint()
    route("/mms") {
        get("/health") { }

        datastreams()
        entities()
        manifests()

        intercept(ApplicationCallPipeline.Call) {
            if (call.request.uri.startsWith("/mms")) {
                requestProxy(client, mmsUrl, "/mms")
                finish()
            }
        }
    }
}
