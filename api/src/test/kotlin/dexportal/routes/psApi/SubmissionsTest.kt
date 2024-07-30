package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.ApolloResponse
import com.dexportal.SubmissionsQuery
import dexportal.utils.testModule
import dexportal.utils.toJsonString
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import io.mockk.coEvery
import io.mockk.mockk
import java.util.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class SubmissionsRouteTest {
    private val mockApolloClient = mockk<ApolloClient>()

    @Test
    fun testSubmissionsRouteSuccess() = testApplication {
        val mockRequestUuid = UUID.fromString("123e4567-e89b-12d3-a456-426614174000")
        val mockData = SubmissionsQuery.Data(
            uploads = SubmissionsQuery.Uploads(
                summary = SubmissionsQuery.Summary(
                    numberOfPages = 1,
                    pageNumber = 1,
                    pageSize = 1,
                    totalItems = 10
                ),
                items = listOf(
                    SubmissionsQuery.Item(
                        bytesUploaded = 50,
                        fileName = "Mock File",
                        fileSizeBytes = 50,
                        issues = listOf(),
                        metadata = null,
                        percentComplete = 50.0,
                        status = "Mock Status",
                        timeUploadingSec = 10.0,
                        timestamp = "mock time",
                        uploadId = "abc123"
                    )
                )
            ),
        )

        val mockResponse = ApolloResponse.Builder(
            operation = SubmissionsQuery(
                "dataStream",
                "dataRoute",
                "20230728T154500Z",
                "20230729T154500Z",
                10,
                1,
                "",
                ""
            ),
            data = mockData,
            requestUuid = mockRequestUuid
        ).build()

        coEvery {
            mockApolloClient.query(any<SubmissionsQuery>()).addHttpHeader("Authorization", any()).execute()
        } returns mockResponse

        application {
            testModule(mockApolloClient)
        }

        client.get("/file-submissions?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.OK, status)
            assertEquals(mockResponse.toJsonString(), bodyAsText())
        }
    }

    @Test
    fun testSubmissionsRouteMissingDataStream() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/file-submissions?data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Datastream name must be provided", bodyAsText())
        }
    }

    @Test
    fun testSubmissionsRouteMissingDateStart() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/file-submissions?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Date start and date end must be provided", bodyAsText())
        }
    }

    @Test
    fun testSubmissionsRouteMissingDateEnd() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/file-submissions?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Date start and date end must be provided", bodyAsText())
        }
    }

    @Test
    fun testSubmissionsRouteMissingAuthToken() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/file-submissions?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Authorization token must be provided", bodyAsText())
        }
    }

    @Test
    fun testSubmissionsRouteInvalidDate() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        val inputDate = "invalid-date"

        client.get("/file-submissions?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=$inputDate&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertTrue(bodyAsText().startsWith("Invalid date format: $inputDate"))
        }
    }
}
