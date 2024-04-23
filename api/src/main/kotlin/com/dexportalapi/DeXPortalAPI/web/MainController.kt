package com.dexportalapi.DeXPortalAPI

import java.time.LocalDate
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.*
import org.springframework.web.server.ResponseStatusException

/**
 * TODO:
 * - add CustomInternalServerErrorException
 * - add CustomBadRequestException
 */
@RestController
class MainController() {

    private val webClient = WebClient.builder().build()

    private var psAPIUrl: String = ""
    private var samsUrl: String = ""
    private var clientId: String = ""
    private var clientSecret: String = ""
    private var redirectURI: String = ""

    fun setupEnv(): Boolean {
        psAPIUrl = System.getenv("PS_API_URL").toString()
        samsUrl = System.getenv("SAMS_URL").toString()
        clientId = System.getenv("SAMS_CLIENT_ID").toString()
        clientSecret = System.getenv("SAMS_CLIENT_SECRET").toString()
        redirectURI = System.getenv("SAMS_REDIRECT_URL").toString()

        if ((psAPIUrl != null && psAPIUrl.length > 0) &&
            (samsUrl != null && samsUrl.length > 0) &&
            (clientId != null && clientId.length > 0) &&
            (clientSecret != null && clientSecret.length > 0) &&
            (redirectURI != null && redirectURI.length > 0)) {
            return true
        } else {
            return false
        }
    }

    @CrossOrigin
    @GetMapping("/")
    fun index(): String {
        return "Status: OK"
    }

    @CrossOrigin
    @GetMapping("/health")
    fun health(): String {
        return "Status: OK"
    }

    @CrossOrigin
    @GetMapping("/fileSubmissions")
    suspend fun getFileSubmissionsRequest(
            @RequestParam("data_stream_id") dataStreamId: String,
            @RequestParam("date_start") dateStart: String,
            @RequestParam("page_number") pageNumber: String,
            @RequestHeader("Authorization") authToken: String
    ): String {
        val isConfigured: Boolean = setupEnv()

        if (isConfigured) {
            val response =
                    webClient
                            .get()
                            .uri(
                                    psAPIUrl +
                                            "/api/upload/" + dataStreamId +
                                            "?page_number=" + pageNumber + "&page_size=20"
                            )
                            .header("Authorization", authToken)
                            .retrieve()
                            .onStatus({ responseStatus ->
                                responseStatus == HttpStatus.INTERNAL_SERVER_ERROR
                            }) { throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR) }
                            .onStatus({ responseStatus -> responseStatus == HttpStatus.BAD_REQUEST }) {
                                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
                            }
                            .awaitBody<String>()

            return response
        }

        return "Service not configured"
    }


    @CrossOrigin
    @GetMapping("/reportCounts")
    suspend fun getReportCountsRequest(
            @RequestParam("data_stream_id") dataStreamId: String,
            @RequestParam("data_stream_route") dataStreamRoute: String,
            @RequestParam("date_start") dateStart: String? = "",
            @RequestParam("date_end") dateEnd: String? = "",
            @RequestParam("ext_event") extEvent: String? = "",
            @RequestParam("days_interval") daysInterval: String? = "",
            @RequestHeader("Authorization") authToken: String
    ): String {
        val isConfigured: Boolean = setupEnv()

        if (isConfigured) {
            var uri: String = psAPIUrl + "/api/report/counts/submissions/summary?data_stream_id=" +
                            dataStreamId + "&data_stream_route=" + dataStreamRoute

            if (daysInterval != null && daysInterval.length > 0) {
                uri = uri + "&days_interval=" + daysInterval
            }
            if (dateStart != null && dateStart.length > 0) {
                uri = uri + "&date_start=" + dateStart
            }
            if (dateEnd != null && dateEnd.length > 0) {
                uri = uri + "&date_end=" + dateEnd
            }
            if (extEvent != null && extEvent.length > 0) {
                uri = uri + "&ext_event=" + extEvent
            }

            val response =
                    webClient
                            .get()
                            .uri(uri)
                            .header("Authorization", authToken)
                            .retrieve()
                            .onStatus({ responseStatus ->
                                responseStatus == HttpStatus.INTERNAL_SERVER_ERROR
                            }) { throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR) }
                            .onStatus({ responseStatus -> responseStatus == HttpStatus.BAD_REQUEST }) {
                                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
                            }
                            .awaitBody<String>()

            return response
        }

        return "Service not configured"
    }

    @CrossOrigin
    @GetMapping("/upload/destination")
    suspend fun getDestinationRequest(@RequestHeader("Authorization") authToken: String): String {
        val isConfigured: Boolean = setupEnv()

        if (isConfigured) {
            val response =
                    webClient
                            .get()
                            .uri(psAPIUrl + "/destination")
                            .header("Authorization", authToken)
                            .retrieve()
                            .onStatus({ responseStatus ->
                                responseStatus == HttpStatus.INTERNAL_SERVER_ERROR
                            }) { throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR) }
                            .onStatus({ responseStatus -> responseStatus == HttpStatus.BAD_REQUEST }) {
                                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
                            }
                            .awaitBody<String>()

            return response
        }

        return "Service not configured"
    }

    @CrossOrigin
    @PostMapping("/api/token")
    suspend fun postAuthTokenRequest(@RequestParam("code") authCode: String): String {
        val isConfigured: Boolean = setupEnv()

        if (isConfigured) {
            val grantType: String = "authorization_code"
            val scope: String = "dex:status"

            val response =
                    webClient
                            .post()
                            .uri(samsUrl + "/auth/oauth/v2/token")
                            .contentType(APPLICATION_FORM_URLENCODED)
                            .body(
                                    BodyInserters.fromFormData("grant_type", grantType)
                                            .with("code", authCode)
                                            .with("client_id", clientId)
                                            .with("client_secret", clientSecret)
                                            .with("redirect_uri", redirectURI)
                                            .with("scope", scope)
                            )
                            .retrieve()
                            .onStatus({ responseStatus ->
                                responseStatus == HttpStatus.INTERNAL_SERVER_ERROR
                            }) { throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR) }
                            .onStatus({ responseStatus -> responseStatus == HttpStatus.BAD_REQUEST }) {
                                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
                            }
                            .awaitBody<String>()

            return response
        }

        return "Service not configured"
    }
}
