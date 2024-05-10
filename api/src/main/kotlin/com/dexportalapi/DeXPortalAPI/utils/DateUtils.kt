package com.dexportalapi.DeXPortalAPI.utils

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun processDateString(inputDate: String): String? {
    try {
        val parsedDate = LocalDateTime.parse(inputDate, DateTimeFormatter.ISO_DATE_TIME)

        val isoDateString = parsedDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))

        val cleanedDateString = isoDateString.replace(":", "").replace("-", "").replace(".", "")

        return cleanedDateString
    } catch (e: Exception) {
        println("Error: Invalid date format")
        return null
    }
}
