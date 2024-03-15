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

    @CrossOrigin
    @GetMapping("/health")
    fun health(): String {
        return "Status: OK"
    }

    @CrossOrigin
    @GetMapping("/fileSubmissions")
    suspend fun getDestinationStatusRequest(
            @RequestParam("data_stream_id") dataStreamId: String,
            @RequestParam("date_start") dateStart: String,
            @RequestParam("page_number") pageNumber: String,
            @RequestHeader("Authorization") authToken: String
    ): String {
        val supplementalAPIUrl: String = System.getenv("SUPPLEMENTAL_API_URL").toString()

        val response =
                webClient
                        .get()
                        .uri(
                                supplementalAPIUrl +
                                        "/api/upload/" +
                                        dataStreamId +
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

    @CrossOrigin
    @GetMapping("/upload/destination")
    suspend fun getDestinationRequest(@RequestHeader("Authorization") authToken: String): String {

        val supplementalAPIUrl: String = System.getenv("SUPPLEMENTAL_API_URL").toString()

        val response =
                webClient
                        .get()
                        .uri(supplementalAPIUrl + "/destination")
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

    @CrossOrigin
    @PostMapping("/api/token")
    suspend fun postAuthTokenRequest(@RequestParam("code") authCode: String): String {
        val samsUrl: String = System.getenv("SAMS_URL").toString()
        val clientId: String = System.getenv("SAMS_CLIENT_ID").toString()
        val clientSecret: String = System.getenv("SAMS_CLIENT_SECRET").toString()
        val redirectURI: String = System.getenv("SAMS_REDIRECT_URL").toString()

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
}
