package com.dexportalapi.DeXPortalAPI

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
class DeXPortalApiApplicationTests(@Autowired private val mockMvc: MockMvc) {

    @Test
    fun `health check page`() {
        this.mockMvc.get("/health").andExpect { status { isOk() } }
    }

    @Test
    fun `get upload status 400`() {
        this.mockMvc.get("/upload/status").andExpect { status { isBadRequest() } }
    }

    @Test
    fun `get upload destination 400 without valid auth token`() {
        this.mockMvc.get("/upload/destination").andExpect { status { isBadRequest() } }
    }

    @Test
    fun `get upload destination with auth token`() {
        this.mockMvc
                .perform(
                        get("/upload/destination").header("Authorization", "testoken").content("{}")
                )
                .andExpect(status().isOk())
    }

    @Test
    fun `get upload status with auth token`() {
        this.mockMvc
                .perform(
                        get("/upload/status?destination=test")
                                .header("Authorization", "testoken")
                                .content("{}")
                )
                .andExpect(status().isOk())
    }
}
