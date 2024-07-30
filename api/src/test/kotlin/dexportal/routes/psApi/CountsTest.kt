package dexportal.routes.psApi

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.ApolloResponse
import com.dexportal.CountsQuery
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

class CountsRouteTest {
    private val mockApolloClient = mockk<ApolloClient>()

    @Test
    fun testCountsRouteSuccess() = testApplication {
        val mockRequestUuid = UUID.fromString("123e4567-e89b-12d3-a456-426614174000")
        val mockData = CountsQuery.Data(
            processingCounts = CountsQuery.ProcessingCounts(
                totalCounts = 100, statusCounts = CountsQuery.StatusCounts(
                    failed = CountsQuery.Failed(counts = 10),
                    uploaded = CountsQuery.Uploaded(counts = 80),
                    uploading = CountsQuery.Uploading(counts = 10)
                )
            ),
        )

        val mockResponse = ApolloResponse.Builder(
            operation = CountsQuery("dataStream", "dataRoute", "20230728T154500Z", "20230729T154500Z"),
            data = mockData,
            requestUuid = mockRequestUuid
        ).build()

        coEvery {
            mockApolloClient.query(any<CountsQuery>()).addHttpHeader("Authorization", any()).execute()
        } returns mockResponse

        application {
            testModule(mockApolloClient)
        }

        client.get("/report-counts?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.OK, status)
            assertEquals(mockResponse.toJsonString(), bodyAsText())
        }
    }

    @Test
    fun testCountsRouteMissingDataStream() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/report-counts?data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Datastream name must be provided", bodyAsText())
        }
    }

    @Test
    fun testCountsRouteMissingDateStart() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/report-counts?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Date start and date end must be provided", bodyAsText())
        }
    }

    @Test
    fun testCountsRouteMissingDateEnd() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/report-counts?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Date start and date end must be provided", bodyAsText())
        }
    }

    @Test
    fun testCountsRouteMissingAuthToken() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        client.get("/report-counts?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=2023-07-28T15:45:00&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertEquals("Authorization token must be provided", bodyAsText())
        }
    }

    @Test
    fun testCountsRouteInvalidDate() = testApplication {
        application {
            testModule(mockApolloClient)
        }

        val inputDate = "invalid-date"

        client.get("/report-counts?data_stream_id=dataStream&data_stream_route=dataRoute&date_start=$inputDate&date_end=2023-07-29T15:45:00") {
            header(HttpHeaders.Authorization, "Bearer token")
        }.apply {
            assertEquals(HttpStatusCode.BadRequest, status)
            assertTrue(bodyAsText().startsWith("Invalid date format: $inputDate"))
        }
    }
}
