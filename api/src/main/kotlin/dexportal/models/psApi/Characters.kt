package dexportal.models.psApi

import kotlinx.serialization.Serializable

@Serializable
data class Person(val name: String)

@Serializable
data class AllPeople(val people: List<Person>)

