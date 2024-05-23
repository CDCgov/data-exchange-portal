package dexportal.models.mms

import kotlinx.serialization.Serializable

@Serializable
data class Entity(val id: Int? = null, val name: String)

@Serializable
data class Program(val id: Int? = null, val name: String)

@Serializable
data class Group(val id: Int? = null, val name: String)
