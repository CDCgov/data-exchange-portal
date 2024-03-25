package com.dexportalapi.DeXPortalAPI

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
class DeXPortalApiApplicationTests(@Autowired private val mockMvc: MockMvc) {

    @Test
    fun `index page`() {
        this.mockMvc.get("/").andExpect { status { isOk() } }
    }

    @Test
    fun `health check page`() {
        this.mockMvc.get("/health").andExpect { status { isOk() } }
    }

    @Test
    fun `get file submissions status 400`() {
        this.mockMvc.get("/fileSubmissions").andExpect { status { isBadRequest() } }
    }

    @Test
    fun `get report counts status 400`() {
        this.mockMvc.get("/reportCounts").andExpect { status { isBadRequest() } }
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
    fun `get auth token`() {
        this.mockMvc
                .perform(post("/api/token?code=test&state=test").content("{}"))
                .andExpect(status().isOk())
    }

    @Test
    fun `get auth token bad request`() {
        this.mockMvc.perform(post("/api/token")).andExpect(status().isBadRequest())
    }

    @Test
    fun `get file submissions status with auth token`() {
        this.mockMvc
                .perform(
                        get("/fileSubmissions?data_stream_id=test&date_start=test&page_number=1")
                                .header("Authorization", "testoken")
                                .content("{}")
                )
                .andExpect(status().isOk())
    }
    
    @Test
    fun `get report counts status with auth token`() {
        this.mockMvc
                .perform(
                        get("/reportCounts?data_stream_id=test&data_stream_route=test&date_start=test&date_end=test&ext_event=test")
                                .header("Authorization", "testoken")
                                .content("{}")
                )
                .andExpect(status().isOk())
    }
}
