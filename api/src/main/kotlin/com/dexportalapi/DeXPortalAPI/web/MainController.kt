package com.dexportalapi.DeXPortalAPI

import java.time.LocalDate
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED
import org.springframework.web.bind.annotation.GetMapping
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

    @GetMapping("/health")
    fun health(): String {
        return "Status: OK"
    }

    @GetMapping("/upload/status")
    suspend fun getDestinationStatusRequest(
            @RequestParam("destination") destination: String,
            @RequestHeader("Authorization") auth_token: String
    ): String {

        val supplemental_api_url: String = System.getenv("SUPPLEMENTAL_API_URL").toString()
        val currentDate: LocalDate = LocalDate.now()
        val currentDateMinusThirtyDays: LocalDate = currentDate.minusDays(30)

        val dtf: DateTimeFormatter = DateTimeFormatter.ofPattern("uuu-MM-ddHH:mm:ss")
        val formattedDate: String =
                currentDateMinusThirtyDays.atStartOfDay().atOffset(ZoneOffset.UTC).format(dtf)

        val response =
                webClient
                        .get()
                        .uri(
                                supplemental_api_url +
                                        "/status/destination/" +
                                        destination +
                                        "?date_start=" +
                                        formattedDate,
                        )
                        .header("Authorization", auth_token)
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

    @GetMapping("/upload/destination")
    suspend fun getDestinationRequest(@RequestHeader("Authorization") auth_token: String): String {

        val supplemental_api_url: String = System.getenv("SUPPLEMENTAL_API_URL").toString()

        val response =
                webClient
                        .get()
                        .uri(supplemental_api_url + "/destination")
                        .header("Authorization", auth_token)
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

    @GetMapping("/api/token")
    suspend fun getAuthTokenRequest(
            @RequestParam("code") auth_code: String,
            @RequestParam("state") state: String
    ): String {
        val sams_url: String = System.getenv("SAMS_URL").toString()
        val client_id: String = System.getenv("SAMS_CLIENT_ID").toString()
        val client_secret: String = System.getenv("SAMS_CLIENT_SECRET").toString()
        val redirect_uri: String = System.getenv("SAMS_REDIRECT_URL").toString()

        val grant_type: String = "authorization_code"
        val scope: String = "dex:status"

        val response =
                webClient
                        .post()
                        .uri(sams_url + "/auth/oauth/v2/token")
                        .contentType(APPLICATION_FORM_URLENCODED)
                        .body(
                                BodyInserters.fromFormData("grant_type", grant_type)
                                        .with("code", auth_code)
                                        .with("client_id", client_id)
                                        .with("client_secret", client_secret)
                                        .with("redirect_uri", redirect_uri)
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
