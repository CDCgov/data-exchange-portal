package dexportal.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dexportal.routes.psApi.*
import dexportal.routes.mms.*

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.network.okHttpClient
import dexportal.config.ConfigLoader

// TODO: Remove once PS-API Certs are in place
import okhttp3.OkHttpClient
import java.security.SecureRandom
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager

// TODO: Remove once PS-API Certs are in place
fun OkHttpClient.Builder.ignoreAllSSLErrors(): OkHttpClient.Builder {
    val naiveTrustManager = object : X509TrustManager {
        override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
        override fun checkClientTrusted(certs: Array<X509Certificate>, authType: String) = Unit
        override fun checkServerTrusted(certs: Array<X509Certificate>, authType: String) = Unit
    }

    val insecureSocketFactory = SSLContext.getInstance("TLSv1.2").apply {
        val trustAllCerts = arrayOf<TrustManager>(naiveTrustManager)
        init(null, trustAllCerts, SecureRandom())
    }.socketFactory

    sslSocketFactory(insecureSocketFactory, naiveTrustManager)
    hostnameVerifier { _, _ -> true }
    return this
}

fun Application.configureRouting() {
// TODO: Remove once PS-API Certs are in place
    val okHttpClient = OkHttpClient.Builder().ignoreAllSSLErrors().build()

    val psApiEndpoint = ConfigLoader.getPsApiEndpoint()
    val apolloClient = ApolloClient.Builder().serverUrl(psApiEndpoint).okHttpClient(okHttpClient).build()

    val client = HttpClient(CIO) {
        install(HttpTimeout) {
            requestTimeoutMillis = 60000
            connectTimeoutMillis = 5000
        }
    }

    routing {
        route("/api") {
            get {
                call.respondText("Status: OK")
            }
            healthCheck(client, apolloClient)
            authRoutes(client)
            mms(client)
            psAPI(apolloClient)
        }
    }

    environment.monitor.subscribe(ApplicationStopped) {
        client.close()
        apolloClient.close()
    }
}
