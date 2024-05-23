// These models are likely unnecessary since ApolloClient will generate models automatically based on queries/schema
package dexportal.models.psApi

data class CountsDetails(
    val counts: Int,
    // Todo: Figure out way to handle unknown string-type keys
    val reasons: Map<String,Int>? = emptyMap()
)

data class StatusCounts(
    // How do we handle `[key: string]: CountDetails`
    val completed: CountsDetails,
    val failed: CountsDetails,
    val processing: CountsDetails
)

data class ReportCounts(
    val totalCounts: Int,
    val statusCounts: StatusCounts
)

