data class CountsDetails(
    val counts: Int,
    val reasons?: Map<String,Int> = emptyMap()
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
