val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val apollo_version: String by project

plugins {
    kotlin("jvm") version "2.0.0"
    kotlin("plugin.serialization") version "1.9.10"
    id("io.ktor.plugin") version "2.3.11"
    id("com.apollographql.apollo3").version("3.8.4")
}

group = "dexportal"
version = "0.0.1"

application {
    mainClass.set("dexportal.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version")
    implementation("io.ktor:ktor-server-openapi:$ktor_version")
    implementation("io.ktor:ktor-server-swagger-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")
    implementation("io.ktor:ktor-server-auth:$ktor_version")
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("com.apollographql.apollo3:apollo-runtime:$apollo_version")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
    testImplementation("io.mockk:mockk:1.13.10")
}

apollo {
    service("service") {
        packageName.set("com.dexportal")
        schemaFile.set(file("src/main/graphql/com/dexportal/schema.graphqls"))
        generateKotlinModels.set(true)
    }
}
