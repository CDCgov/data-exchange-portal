package dexportal.config

data class AuthConfig(
    val samsClientId: String,
    val samsClientSecret: String,
    val samsUrl: String,
    val samsRedirectUrl: String,
)

object ConfigLoader {
    fun loadAuthConfig(): AuthConfig {
        return AuthConfig(
            samsClientId = System.getenv("SAMS_CLIENT_ID") ?: throw IllegalStateException("SAMS_CLIENT_ID not set"),
            samsClientSecret = System.getenv("SAMS_CLIENT_SECRET")
                ?: throw IllegalStateException("SAMS_CLIENT_SECRET not set"),
            samsUrl = System.getenv("SAMS_URL") ?: throw IllegalStateException("SAMS_URL not set"),
            samsRedirectUrl = System.getenv("SAMS_REDIRECT_URL")
                ?: throw IllegalStateException("SAMS_REDIRECT_URL not set")
        )
    }

    fun getPsApiEndpoint(): String {
        val psAPIUrl: String = System.getenv("PS_API_URL") ?: throw IllegalStateException("PS_API_URL not set")
        return psAPIUrl;
    }
}
