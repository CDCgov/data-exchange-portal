package dexportal

import dexportal.routes.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.*

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        application {
            configureAuthentication()
            configureRouting()
        }
        client.get("/api").apply {
            assertEquals(HttpStatusCode.OK, status)
            assertEquals("Status: OK", bodyAsText())
        }
    }
}