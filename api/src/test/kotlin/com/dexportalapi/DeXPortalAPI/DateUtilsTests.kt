package com.dexportalapi.DeXPortalAPI

import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class DateUtilsTest {

    @Test
    fun testProcessDateString_ValidInput() {
        val inputDate = "2024-04-09T17:42:42.343Z"
        val expectedOutput = "20240409T174242Z"

        val result = processDateString(inputDate)

        assertEquals(expectedOutput, result)
    }

    @Test
    fun testProcessDateString_EmptyInput() {
        val inputDate = ""

        val result = processDateString(inputDate)

        assertNull(result)
    }

    @Test
    fun testProcessDateString_InvalidInput() {
        val inputDate = "InvalidDateString"

        val result = processDateString(inputDate)

        assertNull(result)
    }
}
